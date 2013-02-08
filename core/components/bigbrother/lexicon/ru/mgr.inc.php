<?php
/**
 * MGR Russian Lexicon Entries for BigBrother
 *
 * @package bigbrother
 * @subpackage lexicon
 * @author Anton Slobodchuk, http://www.gecko-studio.ru/
 * 
 */
$_lang['bigbrother.main_title']                    = 'Google Analytics';

/* Alert */
$_lang['bigbrother.alert_failed']                  = 'Ошибка';

/* Action buttons - modAB */
$_lang['bigbrother.revoke_authorization']          = 'Отменить авторизацию';
$_lang['bigbrother.revoke_permission']             = 'Отменить авторизацию?';
$_lang['bigbrother.revoke_permission_msg']         = 'После отмены авторизации, вам необходимо будет заново пройти процесс установки компонента. Это нужно для того, чтобы MODx получил права на использование API Google Analytics.<br />
                                                      <br />
                                                      Вы действительно хотите отменить авторизацию?
                                                      <span class="warning"><strong>Внимание:</strong> Все измененные настройки аккаунтов, относящиеся к пользователям, также будут удалены.</span>';

/* Authenticate */
$_lang['bigbrother.account_authentication_desc']   = 'Нажмите на кнопку ниже, чтобы MODx получил права на использование API Google Analytics.</p>
                                                      <p><em>Вы будете переадресованы на страницу авторизации в Google. После прохождения авторизации произойдет переадресация обратно и вам необходимо будет выбрать аккаунт для отображения отчетов Google Analytics.</em>';
$_lang['bigbrother.bd_root_desc']                  = 'Проверка наличия PHP расширений SimpleXML и cURL перед переадресацией на страницу авторизации';
$_lang['bigbrother.bd_root_crumb_text']            = 'Предварительная проверка параметров';

$_lang['bigbrother.verify_prerequisite_settings']  = 'Предварительная проверка параметров';
$_lang['bigbrother.start_the_login_process']       = 'Начать процесс авторизации';
$_lang['bigbrother.callback_label']                = 'Callback URL';
$_lang['bigbrother.callback_label_under']          = 'Если адрес, указанный в поле, не совпадает с адресом текущей страницы (выводится в адресной строке браузера), скопируйте и вставьте сюда адрес текущей страницы.';

/* Oauth complete */
$_lang['bigbrother.bd_oauth_complete_in_progress'] = 'Авторизация в процессе...';
$_lang['bigbrother.bd_oauth_authorize']            = 'Авторизация';
$_lang['bigbrother.oauth_select_account']          = 'Выберите аккаунт...';
$_lang['bigbrother.oauth_btn_select_account']      = 'Выбрать аккаунт для просмотра отчетов';

/* Oauth response */
$_lang['bigbrother.err_load_oauth']                = 'Не могу загрузить класс OAuth. Пожалуйста переустановите компонент или обратитесь к администратору сайта.';

/* mgr - breadcrumbs */
$_lang['bigbrother.bd_authorize']                  = 'Авторизация';
$_lang['bigbrother.bd_choose_an_account']          = 'Выбор аккаунта';

/* mgr - Authenticate Ajax response strings */
$_lang['bigbrother.class_simplexml']               = '<strong>PHP расширение <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> не установлено.<br />
                                                      Данное расширение необходимо для правильноый работы компонента.</strong>';
$_lang['bigbrother.function_curl']                 = '<strong>PHP расширение <a href="http://www.php.net/manual/en/book.curl.php">cURL</a> не установлено.<br />
                                                      Данное расширение необходимо для правильноый работы компонента.</strong>';
$_lang['bigbrother.redirect_to_google']            = 'Переадресация в Google, пожалуйста подождите...';
$_lang['bigbrother.authentification_complete']     = 'Авторизация завершена.</p>
                                                      <p>Выберите аккаунт по умолчанию из списка ниже.<br />
                                                      В дальнейшем вы сможете выбрать другой аккаунт в настройках компонента.';
$_lang['bigbrother.account_set_succesfully_wait']  = 'Аккаунт успешно выбран! Пожалуйста подождите...';
$_lang['bigbrother.not_authorized_to']             = 'У вас нет прав для осуществления этой операции. Пожалуйста обратитесь к администратору сайта.';

/* Reports */
$_lang['bigbrother.desc_markup']                   = '<h3>{title}<span>{date_begin} - {date_end}</span></h3><div class="account-infos">{name}<span>{id}</span></div>';
$_lang['bigbrother.loading']                       = 'Загрузка...';

/* Content Overview */

$_lang['bigbrother.content']                       = 'Содержание';
$_lang['bigbrother.content_overview']              = 'Обзор содержания';
$_lang['bigbrother.site_content']                  = 'Содержание сайта';
$_lang['bigbrother.visits_comparisons']            = 'Посещения по сравнению с предыдущим месяцем';

/* Audience Overview */
$_lang['bigbrother.audience']                      = 'Аудитория';
$_lang['bigbrother.audience_overview']             = 'Обзор аудитории';
$_lang['bigbrother.audience_visits']               = 'Посещения';

$_lang['bigbrother.demographics']                  = 'Демография';
$_lang['bigbrother.language']                      = 'Язык';
$_lang['bigbrother.country']                       = 'Местоположение';

$_lang['bigbrother.system']                        = 'Технологии';
$_lang['bigbrother.browser']                       = 'Браузер';
$_lang['bigbrother.operating_system']              = 'Операционная система';
$_lang['bigbrother.service_provider']              = 'Поставщик услуг';

$_lang['bigbrother.mobile']                        = 'Мобильные устройства';
$_lang['bigbrother.screen_resolution']             = 'Разрешение экрана';

/* Traffic sources Overview */
$_lang['bigbrother.traffic_sources']               = 'Источники трафика';
$_lang['bigbrother.traffic_sources_overview']      = 'Обзор источников трафика';
$_lang['bigbrother.traffic_sources_visits']        = 'Посещения';

$_lang['bigbrother.organic_source']                = 'Поисковые системы';
$_lang['bigbrother.keyword']                       = 'Запросы в поисковых системах';
$_lang['bigbrother.referral_source']               = 'Ссылающиеся сайты';
$_lang['bigbrother.landing_page']                  = 'Страницы входа';

/* Misc - Dimensions */
$_lang['bigbrother.none']                          = '(нет)';
$_lang['bigbrother.direct_traffic']                = 'Прямой трафик';

$_lang['bigbrother.search_traffic']                = 'organic';
$_lang['bigbrother.referral_traffic']              = 'referral';

$_lang['bigbrother.search_traffic_replace_with']   = 'Поисковые системы';
$_lang['bigbrother.referral_traffic_replace_with'] = 'Ссылающиеся сайты';

/* Misc - Metrics */
$_lang['bigbrother.visits_and_uniques']            = 'Посещения и уникальные посещения';
$_lang['bigbrother.avg_time_on_site']              = 'Средняя продолжительность посещения';
$_lang['bigbrother.page']                          = 'Страница';
$_lang['bigbrother.pagetitle']                     = 'Заголовки страниц';
$_lang['bigbrother.pageviews']                     = 'Просмотры страниц';
$_lang['bigbrother.pageviews_per_visit']           = 'Страниц / посещение';
$_lang['bigbrother.unique_pageviews']              = 'Уникальные просмотры страниц';
$_lang['bigbrother.bounce_rate']                   = 'Показатель отказов';
$_lang['bigbrother.visits']                        = 'Посещения';
$_lang['bigbrother.visitors']                      = 'Посетители';
$_lang['bigbrother.percent_visits']                = 'Посещения, %';
$_lang['bigbrother.exit_rate']                     = 'Процент выходов';
$_lang['bigbrother.new_visits']                    = 'Новые посещения';
$_lang['bigbrother.new_visits_in_percent']         = 'Новые посещения, %';
$_lang['bigbrother.direct_traffic']                = 'Прямой трафик';
$_lang['bigbrother.search_engines']                = 'Поисковые системы';

/* Options panel */
$_lang['bigbrother.google_analytics_options']      = 'Настройки Google Analytics';
$_lang['bigbrother.options']                       = 'Настройки';
$_lang['bigbrother.save_settings']                 = 'Сохранить настройки';
$_lang['bigbrother.general_options']               = 'Общие настройки';
$_lang['bigbrother.dashboard_options']             = 'Настройки панели';
$_lang['bigbrother.account_options']               = 'Настройки аккаунта';

/* Options panel - cmp options */
$_lang['bigbrother.accounts_list']                 = 'Список аккаунтов';
$_lang['bigbrother.accounts_list_desc']            = 'Выберите аккаунт для просмотра отчетов';

$_lang['bigbrother.date_range']                    = 'Диапазон дат';
$_lang['bigbrother.date_range_desc']               = 'Количество дней, которое будет показано в отчетах';

$_lang['bigbrother.15_days']                       = '15 дней';
$_lang['bigbrother.30_days']                       = '30 дней';
$_lang['bigbrother.45_days']                       = '45 дней';
$_lang['bigbrother.60_days']                       = '60 дней';

$_lang['bigbrother.today']                         = 'Сегодня';
$_lang['bigbrother.yesterday']                     = 'Вчера';

$_lang['bigbrother.report_end_date']               = 'Последний день в отчетах';
$_lang['bigbrother.report_end_date_desc']          = 'Выберите последний день, отображаемый в отчетах';

$_lang['bigbrother.caching_time']                  = 'Время жизни кэша';
$_lang['bigbrother.caching_time_desc']             = 'Значение (в секундах) устанавливает период жизни результатов, полученных от Google Analytics';

$_lang['bigbrother.admin_groups']                  = 'Группы администраторов';
$_lang['bigbrother.admin_groups_desc']             = 'Группы пользователей в MODx, разделенные запятой, которые имеют доступ к этим настройкам';

/* Options panel - dashboard options */
$_lang['bigbrother.show_visits_on_dashboard']      = 'Посещения';
$_lang['bigbrother.show_visits_on_dashboard_desc'] = 'Показывать график посещений на панеле';

$_lang['bigbrother.show_metas_on_dashboard']       = 'Дополнительная информация';
$_lang['bigbrother.show_metas_on_dashboard_desc']  = 'Показывать дополнительную информацию на панеле';

$_lang['bigbrother.show_pies_on_dashboard']        = 'Посетители и источников трафика';
$_lang['bigbrother.show_pies_on_dashboard_desc']   = 'Показывать диаграммы посетителей и источников трафика на панеле';

/* Account Options */
$_lang['bigbrother.user_account_default']          = "по умолчанию";
$_lang['bigbrother.account_options_desc']          = "<p>Bigbrother использует установленный по умолчанию аккаунт для отчетов Google Analytics для всех пользователей.<br />
                                                      Однако, каждому пользователю MODx возможно назначить определенный аккаунт Google Analytics, это переопределит настройку аккаунта по умолчанию.</p>
                                                      <p>У пользователя с назначенным аккаунтом будут отображаться отчеты из него как на панеле, так и при просмотре детальных отчётов.<br />
                                                      Используйте нижеприведенную таблицу для назначения определенного аккаунта пользователю: кликните два раза на значение в колонке &laquo;Аккаунт&raquo; у соответствующего пользователя. Выведется список для выбора аккаунта из всех доступных.</p>
                                                      <div class=\"warning\"><p><strong>Внимание:</strong> В списке выводятся все пользователи, вне зависимости от их прав на использование панели управления сайтом.</p></div>";
$_lang['bigbrother.search_placeholder']            = "Поиск...";
$_lang['bigbrother.rowheader_name']                = "Имя";
$_lang['bigbrother.rowheader_account']             = "Аккаунт";
