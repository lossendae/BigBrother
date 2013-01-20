<?php
/**
 * MGR Czech Lexicon Entries for BigBrother
 * translated by Jiri Pavlicek jiri@pavlicek.cz
 *
 * @package bigbrother
 * @subpackage lexicon
 * @language cz
 *
 */
$_lang['bigbrother.main_title']                    = 'Google Analytics';

/* Alert */
$_lang['bigbrother.alert_failed']                  = 'Chyba';

/* Action buttons - modAB */
$_lang['bigbrother.revoke_authorization']          = 'Odmítnout autorizaci';
$_lang['bigbrother.revoke_permission']             = 'Odmítnout oprávnění?';
$_lang['bigbrother.revoke_permission_msg']         = 'Po odmítnutí oprávnění budete muset znovu projít nastavovacím procesem, abyste znovu umožnili přístup MODx pro použití Google Analytics API.<br />
                                                      <br />
                                                      Opravdu chcete odmítnout oprávnění?
                                                      <span class="warning"><strong>Pozor:</strong> Všechna dodatečná nastavení pro uživatele budou také odstraněna.</span>';

/* Authenticate */
$_lang['bigbrother.account_authentication_desc']   = 'Použijte tlačítko níže pro autorizaci MODx pro použití Google Analytics API.</p>
                                                      <p><em>Budete přesměrováni na autorizační stránku Google. Po autorizaci budete přesměrováni zpět na tuto stránku a budete vyzváni ke zvolení účtu pro použití v sestavách.</em>';
$_lang['bigbrother.bd_root_desc']                  = 'Kontroluji zda jsou dostupná PHP rozšíření SimpleXML a cURL před vstupem na přihlašovací stránku';
$_lang['bigbrother.bd_root_crumb_text']            = 'Zkontrolovat požadavky';

$_lang['bigbrother.verify_prerequisite_settings']  = 'Nastavení pro kontrolu požadavků';
$_lang['bigbrother.start_the_login_process']       = 'Zahájit proces přihlášení';
$_lang['bigbrother.callback_label']                = 'URL pro návrat';
$_lang['bigbrother.callback_label_under']          = 'Pokud se zadané URL v tomto poli neshoduje s URL této stránky, zkopírujte a vložte URL z adresní řádky webového prohlížeče.';

/* Oauth complete */
$_lang['bigbrother.bd_oauth_complete_in_progress'] = 'Probíhá autentizace...';
$_lang['bigbrother.bd_oauth_authorize']            = 'Autorizovat';
$_lang['bigbrother.oauth_select_account']          = 'Vyberte účet...';
$_lang['bigbrother.oauth_btn_select_account']      = 'vyberte tento účet a zobrazte sestavu';

/* Oauth response */
$_lang['bigbrother.err_load_oauth']                = 'Nepodařilo se načíst požadovanou třídu OAuth. Reinstalujte komponentu nebo kontaktujte webmastera.';

/* mgr - breadcrumbs */
$_lang['bigbrother.bd_authorize']                  = 'Autorizovat';
$_lang['bigbrother.bd_choose_an_account']          = 'Vyberte účet';

/* mgr - Authenticate Ajax response strings */
$_lang['bigbrother.class_simplexml']               = '<strong>Vypadá to, že <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> není zkompilováno pro vaši verzi PHP.<br />
                                                      Rozšíření SimpleXML je požadováno pro správné fungovaní této komponenty.</strong>';
$_lang['bigbrother.function_curl']                 = '<strong>Vypodá to, že <a href="http://www.php.net/manual/en/book.curl.php">cURL</a> není zkompilováno pro vaši verzi PHP.<br />
                                                      Rozšíření cURL je požadováno pro správné fungování této komomponenty.</strong>';
$_lang['bigbrother.redirect_to_google']            = 'Probíhá přesměrování na Google, počkejte prosím...';
$_lang['bigbrother.authentification_complete']     = 'Autentizace dokončena.</p>
                                                      <p>Vyberte ze seznamu níže účet, který chcete používat jako výchozí.<br />
                                                      Kdykoliv na nástěnce můžete vybrat jiný účet.';
$_lang['bigbrother.account_set_succesfully_wait']  = 'Účet úspěšně nastaven! Prosím čekejte...';
$_lang['bigbrother.not_authorized_to']             = 'Máte nedostatčná oprávnění pro tuto operaci. Prosím, kontaktuje správce webu.';

/* Reports */
$_lang['bigbrother.desc_markup']                   = '<h3>{title}<span>{date_begin} - {date_end}</span></h3><div class="account-infos">{name}<span>{id}</span></div>';
$_lang['bigbrother.loading']                       = 'Načítám...';

/* Content Overview */

$_lang['bigbrother.content']                       = 'Obsah';
$_lang['bigbrother.content_overview']              = 'Přehled obsahu';
$_lang['bigbrother.site_content']                  = 'Obsah webu';
$_lang['bigbrother.visits_comparisons']            = 'Návštěvy porovnané s předchozím měsícem';

/* Audience Overview */
$_lang['bigbrother.audience']                      = 'Cílové publikum';
$_lang['bigbrother.audience_overview']             = 'Přehled publika';
$_lang['bigbrother.audience_visits']               = 'Návštěvy';

$_lang['bigbrother.demographics']                  = 'Demografické údaje';
$_lang['bigbrother.language']                      = 'Jazyky';
$_lang['bigbrother.country']                       = 'Lokalita';

$_lang['bigbrother.system']                        = 'Systém';
$_lang['bigbrother.browser']                       = 'Prohlížeč';
$_lang['bigbrother.operating_system']              = 'Operační systém';
$_lang['bigbrother.service_provider']              = 'Síť';

$_lang['bigbrother.mobile']                        = 'Mobilní přístupy';
$_lang['bigbrother.screen_resolution']             = 'Rozlišení obrazovky';

/* Traffic sources Overview */
$_lang['bigbrother.traffic_sources']               = 'Zdroje návštěv';
$_lang['bigbrother.traffic_sources_overview']      = 'Přehled zdrojů návštěv';
$_lang['bigbrother.traffic_sources_visits']        = 'Návštěvy';

$_lang['bigbrother.organic_source']                = 'Vyhledávače';
$_lang['bigbrother.keyword']                       = 'Klíčová slova';
$_lang['bigbrother.referral_source']               = 'Odkazující stránky';
$_lang['bigbrother.landing_page']                  = 'Vstupní stránky';

/* Misc - Dimensions */
$_lang['bigbrother.none']                          = '(none)';
$_lang['bigbrother.direct_traffic']                = 'Přímá návštěvnost';

$_lang['bigbrother.search_traffic']                = 'organic';
$_lang['bigbrother.referral_traffic']              = 'referral';

$_lang['bigbrother.search_traffic_replace_with']   = 'Vyhledávače';
$_lang['bigbrother.referral_traffic_replace_with'] = 'Odkazující stránky';

/* Misc - Metrics */
$_lang['bigbrother.visits_and_uniques']            = 'Unikátní návštěvy';
$_lang['bigbrother.avg_time_on_site']              = 'Prům. doba trvání návštěvy';
$_lang['bigbrother.page']                          = 'Stránka';
$_lang['bigbrother.pagetitle']                     = 'Nadpis stránky';
$_lang['bigbrother.pageviews']                     = 'Zobrazení stránek';
$_lang['bigbrother.pageviews_per_visit']           = 'Počet stránek na návštěvu';
$_lang['bigbrother.unique_pageviews']              = 'Unikátní zobrazení stránek';
$_lang['bigbrother.bounce_rate']                   = 'Míra opuštění';
$_lang['bigbrother.visits']                        = 'Návštěvy';
$_lang['bigbrother.visitors']                      = 'Návštěvníci';
$_lang['bigbrother.percent_visits']                = '% Návštěv';
$_lang['bigbrother.exit_rate']                     = '% Odchodů';
$_lang['bigbrother.new_visits']                    = 'Nové návštěvy';
$_lang['bigbrother.new_visits_in_percent']         = '% nových návštěv';
$_lang['bigbrother.direct_traffic']                = 'Přímá návštěvnost';
$_lang['bigbrother.search_engines']                = 'Vyhledávače';

/* Options panel */
$_lang['bigbrother.google_analytics_options']      = 'Nastavení Google Analytics';
$_lang['bigbrother.options']                       = 'Nastavení';
$_lang['bigbrother.save_settings']                 = 'Uložit nastavení';
$_lang['bigbrother.general_options']               = 'Hlavní nastavení';
$_lang['bigbrother.dashboard_options']             = 'Nástěnka';
$_lang['bigbrother.account_options']               = 'Účet';

/* Options panel - cmp options */
$_lang['bigbrother.accounts_list']                 = 'Seznam účtů';
$_lang['bigbrother.accounts_list_desc']            = 'Vyberte účet, který chcete použít pro sestavu';

$_lang['bigbrother.date_range']                    = 'Rozsah';
$_lang['bigbrother.date_range_desc']               = 'vyberte rozsah pro sestavy';

$_lang['bigbrother.15_days']                       = '15 dní';
$_lang['bigbrother.30_days']                       = '30 dní';
$_lang['bigbrother.45_days']                       = '45 dní';
$_lang['bigbrother.60_days']                       = '60 dní';

$_lang['bigbrother.today']                         = 'Dnes';
$_lang['bigbrother.yesterday']                     = 'Včera';

$_lang['bigbrother.report_end_date']               = 'Konečný den sestavy';
$_lang['bigbrother.report_end_date_desc']          = 'Vyberte konečný den sestavy';

$_lang['bigbrother.caching_time']                  = 'Platnost cache';
$_lang['bigbrother.caching_time_desc']             = 'Jak dlouho budou údaje uchovány v lokální cache (v sekundách)';

$_lang['bigbrother.admin_groups']                  = 'Skupiny administrátorů';
$_lang['bigbrother.admin_groups_desc']             = 'Čárkou oddělený seznam názvů skupin administrátorů, kteří mají přístup do tohoto nastavení';

/* Options panel - dashboard options */
$_lang['bigbrother.show_visits_on_dashboard']      = 'Návštěvy';
$_lang['bigbrother.show_visits_on_dashboard_desc'] = 'Zobrazit návštěvy na nástěnce';

$_lang['bigbrother.show_metas_on_dashboard']       = 'Informace';
$_lang['bigbrother.show_metas_on_dashboard_desc']  = 'Zobrazit meta informatice na nástěnce';

$_lang['bigbrother.show_pies_on_dashboard']        = 'Návštěvníci a zdroje návštěv';
$_lang['bigbrother.show_pies_on_dashboard_desc']   = 'Zobrazit koláčový graf návštěvníků a zdrojů návštěv na nástěnce';

/* Account Options */
$_lang['bigbrother.user_account_default']          = "výchozí";
$_lang['bigbrother.account_options_desc']          = "<p>Bigbrother používá výchozí účet pro sestavy Google Analytics.<br />
                                                      Ovšem je možné přiřadit určitý Google Analytics účet konkrétnímu uživateli MODx a přepsat tak výchozí nastavení.</p>
                                                      <p>Toto nastavení se uplatní v Komponenty / Google Analytics i na nástěnce.<br />
                                                      Použijte tabulku níže k nastavení účtu kliknutí na nastavenou hodnotu. Po kliknutí se vám zobrazí seznam všech účtů.</p>
                                                      <div class=\"warning\"><p><strong>Pozor:</strong> Seznam uživatelů obsahuje všechny uživatele bez ohledu na to jestli mají přístup do manageru.</p></div>";
$_lang['bigbrother.search_placeholder']            = "Hledat...";
$_lang['bigbrother.rowheader_name']                = "Název";
$_lang['bigbrother.rowheader_account']             = "Účet";
