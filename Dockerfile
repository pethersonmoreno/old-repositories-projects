ARG DEBIAN_CODE_NAME
ARG PYTHON_VERSION
FROM debian:${DEBIAN_CODE_NAME} as pjsip-build
ARG PJSIP_VERSION
ENV SIP_ROOT_DIR=/opt/pjsip

RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends \
        build-essential \
        ca-certificates \
        curl \
        libgsm1-dev \
        libspeex-dev \
        libspeexdsp-dev \
        libssl-dev \
        libsrtp2-dev \
        libyuv-dev \
        portaudio19-dev \
        && apt-get purge -y --auto-remove \
        && rm -rf /var/lib/apt/lists/*

RUN cat <<EOF | tee /tmp/pjsip_config_site.h
#define PJ_DEBUG    0
#define PJ_TIMER_DEBUG  0
#define PJ_HAS_IPV6 1
EOF

RUN mkdir /tmp/src-pjsip && \
    cd /tmp/src-pjsip && \
        curl -sL https://github.com/pjsip/pjproject/archive/refs/tags/${PJSIP_VERSION}.tar.gz | \
            tar --strip-components 1 -xz && \
    cp -a /tmp/pjsip_config_site.h pjlib/include/pj/config_site.h && \
    export CFLAGS="-fPIC -O2 -DNDEBUG" && \
    ./configure \
        --prefix=$SIP_ROOT_DIR \
        --with-external-speex \
        --with-external-srtp \
        --with-external-pa \
        --with-external-gsm \
        --with-external-yuv \
        --enable-shared \
        --disable-opencore-amr \
        --disable-sound \
        --disable-resample \
        --disable-video && \
    make dep && \
    make && \
    make install && \
    echo "$SIP_ROOT_DIR/lib" | tee -a /etc/ld.so.conf.d/pjsip.conf \
    /sbin/ldconfig && \
    rm -rf /tmp/src-pjsip

# 
# build pjsua2 to use in python
# 
FROM python:${PYTHON_VERSION}-${DEBIAN_CODE_NAME} as pjsua2-build
LABEL org.opencontainers.image.authors="Petherson Moreno <pethermoreno@gmail.com>"
ARG PJSIP_VERSION

COPY --from=pjsip-build /opt/pjsip/include/ /usr/include/
COPY --from=pjsip-build /opt/pjsip/lib/ /usr/lib/
COPY --from=pjsip-build /tmp/pjsip_config_site.h /tmp/pjsip_config_site.h

RUN apt-get update -qq && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends \
        swig \
        libgsm1-dev \
        libspeex-dev \
        libspeexdsp-dev \
        libsrtp2-dev \
        portaudio19-dev \
        ffmpeg \
        python3-av \
        && apt-get purge -y --auto-remove \
        && rm -rf /var/lib/apt/lists/*

RUN mkdir /tmp/src-build-pjsua2 && \
    cd /tmp/src-build-pjsua2 && \
    curl -sL https://github.com/pjsip/pjproject/archive/refs/tags/${PJSIP_VERSION}.tar.gz | \
        tar --strip-components 1 -xz && \
    cp -a /tmp/pjsip_config_site.h pjlib/include/pj/config_site.h && \
    sed -E 's/LANG = python java/LANG = python/g' -i pjsip-apps/src/swig/Makefile && \
    cd pjsip-apps/src/swig/python && \
    sed -i -E '/^include.+\.mak$/d' helper.mak && \
    export PJ_LDXXLIBS="-lpjsua2 -lstdc++ -lpjsua -lpjsip-ua -lpjsip-simple -lpjsip -lpjmedia-codec -lpjmedia-videodev -lpjmedia-audiodev -lpjmedia -lpjnath -lpjlib-util -lilbccodec -lg7221codec -lwebrtc -lsrtp2 -lgsm -lspeex -lspeexdsp -lportaudio -lpj -lssl -lcrypto -luuid -lm -lrt -lpthread" && \
    export PJ_CXXFLAGS="-g -O2 -DPJ_AUTOCONF=1 -fPIC -O2 -DNDEBUG -DPJ_IS_BIG_ENDIAN=0 -DPJ_IS_LITTLE_ENDIAN=1 -fPIC" && \
    make && \
    python setup.py install && \
    rm -rf /tmp/src-build-pjsua2

RUN rm -rf /tmp/pjsip_config_site.h

CMD ["/bin/bash"]