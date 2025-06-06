ARG DEBIAN_CODE_NAME
ARG PYTHON_VERSION
FROM python:${PYTHON_VERSION}-${DEBIAN_CODE_NAME} as pjsua2-build
LABEL org.opencontainers.image.authors="Petherson Moreno <pethermoreno@gmail.com>"
ARG PJSIP_VERSION
ENV SIP_ROOT_DIR=/usr

RUN apt-get update -qq && \
    apt-get install -y --no-install-recommends \
        curl \
        swig \
        && apt-get purge -y --auto-remove \
        && rm -rf /var/lib/apt/lists/*

RUN cat <<EOF | tee /tmp/pjsip_config_site.h
#define PJ_DEBUG    0
#define PJ_TIMER_DEBUG  0
#define PJ_HAS_IPV6 1
#define PJMEDIA_AUD_DEV_MAX_DEVS 64
#define PJMEDIA_AUDIO_DEV_HAS_ALSA  0
#define PJMEDIA_AUDIO_DEV_HAS_NULL_AUDIO    1
#define PJMEDIA_AUDIO_DEV_HAS_PORTAUDIO 0
#define PJMEDIA_AUDIO_DEV_HAS_COREAUDIO 0
#define PJMEDIA_AUDIO_DEV_HAS_WMME  0
#define PJMEDIA_AUDIO_DEV_HAS_WASAPI    0
#define PJMEDIA_AUDIO_DEV_HAS_LEGACY_DEVICE 0
EOF

RUN mkdir /tmp/src-pjsip && \
    cd /tmp/src-pjsip && \
        curl -sL https://github.com/pjsip/pjproject/archive/refs/tags/${PJSIP_VERSION}.tar.gz | \
            tar --strip-components 1 -xz && \
    mv /tmp/pjsip_config_site.h pjlib/include/pj/config_site.h && \
    export CFLAGS="-fPIC -O2 -DNDEBUG" && \
    ./configure \
        --prefix=$SIP_ROOT_DIR \
        --enable-shared \
        --disable-opencore-amr \
        --disable-video && \
    make dep && \
    make && \
    make install && \
    make install DESTDIR=/tmp/pjsip_installation && \
    cd /tmp/pjsip_installation/usr/ && tar -zcf /tmp/pjsip-package.tar.gz * && \
    cd /tmp && rm -rf /tmp/pjsip_installation && \
    sed -E 's/LANG = python java/LANG = python/g' -i /tmp/src-pjsip/pjsip-apps/src/swig/Makefile && \
    cd /tmp/src-pjsip/pjsip-apps/src/swig/python && \
    make && \
    python setup.py install && \
    python setup.py install --prefix=/tmp/python-pjsua2 && \
    cd /tmp/python-pjsua2/lib/python*/site-packages/pjsua2* && tar -zcf /tmp/python-pjsua2-package.tar.gz *pjsua2* && \
    cd /tmp && rm -rf /tmp/python-pjsua2 && \
    cd /tmp && rm -rf /tmp/src-pjsip

CMD ["/bin/bash"]