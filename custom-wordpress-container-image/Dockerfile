FROM wordpress:5.8.2-apache

ENTRYPOINT ["docker-entrypoint.sh"]

RUN apt update

RUN apt install -y unzip

# Themes
#  - theme popularfx
RUN curl -o /tmp/popularfx.zip https://downloads.wordpress.org/theme/popularfx.1.2.3.zip \
    && unzip /tmp/popularfx.zip -d /var/www/html/wp-content/themes/ \
    && rm /tmp/popularfx.zip

# Plugins
#  - plugin amazon-s3-and-cloudfront
RUN curl -o /tmp/amazon-s3-and-cloudfront.zip https://downloads.wordpress.org/plugin/amazon-s3-and-cloudfront.2.6.2.zip \
    && unzip /tmp/amazon-s3-and-cloudfront.zip -d /var/www/html/wp-content/plugins/ \
    && rm /tmp/amazon-s3-and-cloudfront.zip

# Copy additional files
COPY ./wp-config.php /var/www/html/wp-config.php
COPY ./.htaccess /var/www/html/.htaccess

CMD ["apache2-foreground"]