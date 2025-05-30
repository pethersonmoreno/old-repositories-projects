<?php
if (!function_exists('getenv_var')) {
        function getenv_var($env, $default) {
                if (($val = getenv($env)) !== false) {
                        return $val;
                }
                else {
                        return $default;
                }
        }
}

define( 'DB_NAME', getenv_var('WORDPRESS_DB_NAME', 'wordpress') );
define( 'DB_USER', getenv_var('WORDPRESS_DB_USER', 'example username') );
define( 'DB_PASSWORD', getenv_var('WORDPRESS_DB_PASSWORD', 'example password') );
define( 'DB_HOST', getenv_var('WORDPRESS_DB_HOST', 'mysql') );
define( 'DB_CHARSET', getenv_var('WORDPRESS_DB_CHARSET', 'utf8') );
define( 'DB_COLLATE', getenv_var('WORDPRESS_DB_COLLATE', '') );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 */
define( 'AUTH_KEY',         getenv_var('WORDPRESS_AUTH_KEY',         '.A!YEmT</TZkvDj[_cYyi^&=vAyC+fIcA}=eCJ,0-@`Cb9aK@rn!%t[sX}|V*al,') );
define( 'SECURE_AUTH_KEY',  getenv_var('WORDPRESS_SECURE_AUTH_KEY',  '< Vqp7b}Lemp=W)HRa_/1vM:$z2dhD+o8mAo+;Iq.>hSB&Dg8GW^JUv;v|t-!guW') );
define( 'LOGGED_IN_KEY',    getenv_var('WORDPRESS_LOGGED_IN_KEY',    ':kz+>DD6^)5GzWIYp+!Gv0)VNSms6,)-dNT6n}jk0wyiJ[tDGT{=.XYy.N#u2yXv') );
define( 'NONCE_KEY',        getenv_var('WORDPRESS_NONCE_KEY',        'vzExJ:4t2Y-+0)P58$lE>LIxErlj,E1#[b;HaQ!Pfx?!m, x5~>!j{]`<f+il~s^') );
define( 'AUTH_SALT',        getenv_var('WORDPRESS_AUTH_SALT',        'z6%]+2m[(40;WE;:qGP}?2 |nf&C.nMb{+MK<+SH:9$EjywL@<F!2_/kDyX0XTLY') );
define( 'SECURE_AUTH_SALT', getenv_var('WORDPRESS_SECURE_AUTH_SALT', 'L(W|BAv.>1hUXY|?.LB_rK]df%7VL-[fmLA}-mirME#+N~Pbw}+#H|/HF)kz#|y;') );
define( 'LOGGED_IN_SALT',   getenv_var('WORDPRESS_LOGGED_IN_SALT',   '?^5YP!}3+$H]miiEjt=;NA:FiqX^OR(/g9K7|Zwd%Qy q.^tXED-%w&aHYA/IXq@') );
define( 'NONCE_SALT',       getenv_var('WORDPRESS_NONCE_SALT',       'pKrKOidU]PeJ[d!^o^*#xs}%VgjO~@BtXi8DC,!AP|*0L:AA6KTIwku6.G4yPk=7') );
// (See also https://wordpress.stackexchange.com/a/152905/199287)

$table_prefix = getenv_var('WORDPRESS_TABLE_PREFIX', 'wp_');

define( 'WP_DEBUG', !!getenv_var('WORDPRESS_DEBUG', '') );

/* Add any custom values between this line and the "stop editing" line. */

// If we're behind a proxy server and using HTTPS, we need to alert WordPress of that fact
// see also https://wordpress.org/support/article/administration-over-ssl/#using-a-reverse-proxy
if (isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strpos($_SERVER['HTTP_X_FORWARDED_PROTO'], 'https') !== false) {
        $_SERVER['HTTPS'] = 'on';
}
if (isset($_SERVER['HTTP_CLOUDFRONT_FORWARDED_PROTO']) && strpos($_SERVER['HTTP_CLOUDFRONT_FORWARDED_PROTO'], 'https') !== false) {
        $_SERVER['HTTPS'] = 'on';
}
// (we include this by default because reverse proxying is extremely common in container environments)

if ($configExtra = getenv_var('WORDPRESS_CONFIG_EXTRA', '')) {
        eval($configExtra);
}

if ( ! defined( 'ABSPATH' ) ) {
        define( 'ABSPATH', __DIR__ . '/' );
}

require_once ABSPATH . 'wp-settings.php';
