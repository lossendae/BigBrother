<?php
/**
 * MGR German Lexicon Entries for BigBrother
 *
 * @package bigbrother
 * @subpackage lexicon
 * @author Martin Gartner
 */
$_lang['bigbrother.main_title']                    = 'Google Analytics';

/* Alert */
$_lang['bigbrother.alert_failed']                  = 'Fehlgeschlagen';

/* Action buttons - modAB */
$_lang['bigbrother.revoke_authorization']          = 'Autorisierung widerrufen';
$_lang['bigbrother.revoke_permission']             = 'Berechtigung widerrufen?';
$_lang['bigbrother.revoke_permission_msg']         = 'Wenn Sie die Autoriserung widerrufen, m&uuml;ssen Sie die Konfiguration erneut durchf&uuml;hren um MODx mit einem Google Analytics Konto zu verbinden.<br />
                                                      <br />
                                                      Sind Sie sicher, dass Sie die Autorisierung widerrufen m&ouml;chten?
                                                      <span class="warning"><strong>Hinweis:</strong> Alle benutzer-spezifischen Einstellungen werden ebenfalls zurückgesetzt.</span>';

/* Authenticate */
$_lang['bigbrother.account_authentication_desc']   = 'Verwenden Sie den unten stehenden Button um MODx f&uuml;r die Google Analytics API zu autorisieren.</p>
                                                      <p><em>Sie werden zur Autorisierungsseite von Google umgeleitet, wo Sie Ihre Website mit Ihrem Google Analytics Konto verbinden können. Wenn die Autorisierung abgeschlossen ist, werden Sie wieder auf diese Seite r&uuml;ckgef&uuml;hrt und k&ouml;nnen dann ein Analytics Konto für Ihre Berichte einstellen.</em>';
$_lang['bigbrother.bd_root_desc']                  = '&Uuml;berprüfung ob SimpleXML und cURL PHP Erweiterungen aktiviert sind bevor der Loginvorgang fortgesetzt wird';
$_lang['bigbrother.bd_root_crumb_text']            = 'Prerequisiten &uuml;berpr&uuml;fen';

$_lang['bigbrother.verify_prerequisite_settings']  = 'Einstellungen f&uuml;r Prerequisiten &uuml;berpr&uuml;fen';
$_lang['bigbrother.start_the_login_process']       = 'Beginne mit dem Login Vorgang';
$_lang['bigbrother.callback_label']                = 'Callback URL';
$_lang['bigbrother.callback_label_under']          = 'Falls die in diesem Feld angezeigte URL nicht jener der aktuellen Seite entspricht, fügen Sie die URL aus der Adresszeile des Browsers ein.';

/* Oauth complete */
$_lang['bigbrother.bd_oauth_complete_in_progress'] = 'Autentifizierung l&auml;uft…';
$_lang['bigbrother.bd_oauth_authorize']            = 'Autorisierung';
$_lang['bigbrother.oauth_select_account']          = 'Konto Auswahl...';
$_lang['bigbrother.oauth_btn_select_account']      = 'Konto ausw&auml;hlen und Bericht anzeigen';

/* Oauth response */
$_lang['bigbrother.err_load_oauth']                = 'Die erforderliche OAuth Klasse konte nicht geladen werden. Bitte installieren Sie die Komponente neu oder kontaktieren Sie den Webmaster.';

/* mgr - breadcrumbs */
$_lang['bigbrother.bd_authorize']                  = 'Autorisierung';
$_lang['bigbrother.bd_choose_an_account']          = 'Konto Auswahl';

/* mgr - Authenticate Ajax response strings */
$_lang['bigbrother.class_simplexml']               = '<strong>M&ouml;glicherweise wurde <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> nicht in Ihre PHP Version kompiliert.<br />
                                                      Das Modul ist für die Ausführung dieses Plugins erforderlich.</strong>';
$_lang['bigbrother.function_curl']                 = '<strong>M&ouml;glicherweise wurde <a href="http://www.php.net/manual/en/book.curl.php">cURL</a> nicht in Ihre PHP Version kompiliert.<br />
                                                      Das Modul ist für die Ausführung dieses Plugins erforderlich.</strong>';
$_lang['bigbrother.redirect_to_google']            = 'Umleitung auf die Google Analytics Seite, Bitte warten...';
$_lang['bigbrother.authentification_complete']     = 'Autentifizierung abgeschlossen.</p>
                                                      <p>W&auml;hlen Sie das gew&uuml;nschte Standard Konto in der unten stehenden Liste.<br />
                                                    Sie k&ouml;nnen diese Einstellung jederzeit nachtr&auml;glich vom Dashboard aus &auml;ndern.';
$_lang['bigbrother.account_set_succesfully_wait']  = 'Kontoeinrichtung erfolgreich! Bitte warten...';
$_lang['bigbrother.not_authorized_to']             = 'Sie haben nicht die erforderlichen Berechtigungen den Vorgang auszuf&uuml;hren! Bitte kontaktieren Sie den Site Administrator.';

/* Reports */
$_lang['bigbrother.desc_markup']                   = '<h3>{title}<span>{date_begin} - {date_end}</span></h3><div class="account-infos">{name}<span>{id}</span></div>';
$_lang['bigbrother.loading']                       = 'Daten werden geladen...';

/* Content Overview */

$_lang['bigbrother.content']                       = 'Content';
$_lang['bigbrother.content_overview']              = 'Content-&Uuml;bersicht';
$_lang['bigbrother.site_content']                  = 'Website-Content';
$_lang['bigbrother.visits_comparisons']            = 'Besuche im Vergleich zum Vormonat';

/* Audience Overview */
$_lang['bigbrother.audience']                      = 'Besucher';
$_lang['bigbrother.audience_overview']             = 'Besucher &Uuml;bersicht';
$_lang['bigbrother.audience_visits']               = 'Besuche';

$_lang['bigbrother.demographics']                  = 'Demographisch';
$_lang['bigbrother.language']                      = 'Sprache';
$_lang['bigbrother.country']                       = 'Land/Gebiet';

$_lang['bigbrother.system']                        = 'System';
$_lang['bigbrother.browser']                       = 'Browser';
$_lang['bigbrother.operating_system']              = 'Betriebssystem';
$_lang['bigbrother.service_provider']              = 'Service Provider';

$_lang['bigbrother.mobile']                        = 'Mobil';
$_lang['bigbrother.screen_resolution']             = 'Seitenaufl&ouml;sung';

/* Traffic sources Overview */
$_lang['bigbrother.traffic_sources']               = 'Besucherquellen';
$_lang['bigbrother.traffic_sources_overview']      = '&Uuml;bersicht &uuml;ber Besucherquellen';
$_lang['bigbrother.traffic_sources_visits']        = 'Besuche';

$_lang['bigbrother.organic_source']                = 'Suchzugriff';
$_lang['bigbrother.keyword']                       = 'Suchbegriffe';
$_lang['bigbrother.referral_source']               = 'Verweisquellen';
$_lang['bigbrother.landing_page']                  = 'Zielseite';

/* Misc - Dimensions */
$_lang['bigbrother.none']                          = '(keine)';
$_lang['bigbrother.direct_traffic']                = 'Direkte Zugriffe';

$_lang['bigbrother.search_traffic']                = 'Direkt (organisch)';
$_lang['bigbrother.referral_traffic']              = 'Verweise';

$_lang['bigbrother.search_traffic_replace_with']   = 'Suchzugriffe';
$_lang['bigbrother.referral_traffic_replace_with'] = 'Verweisquellen';

/* Misc - Metrics */
$_lang['bigbrother.visits_and_uniques']            = 'Neu und wiederkehrend';
$_lang['bigbrother.avg_time_on_site']              = 'Durchschn. Besuchsdauer';
$_lang['bigbrother.page']                          = 'Seite';
$_lang['bigbrother.pagetitle']                     = 'Seitentitel';
$_lang['bigbrother.pageviews']                     = 'Seitenaufrufe';
$_lang['bigbrother.pageviews_per_visit']           = 'Seiten/Besuch';
$_lang['bigbrother.unique_pageviews']              = 'Neue Seitenaufrufe';  //??? not found on Google Analytics page
$_lang['bigbrother.bounce_rate']                   = 'Absprungrate';
$_lang['bigbrother.visits']                        = 'Besuche';
$_lang['bigbrother.visitors']                      = 'Besucher';
$_lang['bigbrother.percent_visits']                = '% Besuche';
$_lang['bigbrother.exit_rate']                     = '% Abbrüche';
$_lang['bigbrother.new_visits']                    = 'Neue Besuche';
$_lang['bigbrother.new_visits_in_percent']         = '% Neue Besuche';
$_lang['bigbrother.direct_traffic']                = 'Direkte Zugriffe';
$_lang['bigbrother.search_engines']                = 'Suchmaschinen';

/* Options panel */
$_lang['bigbrother.google_analytics_options']      = 'Google Analytics Einstellungen';
$_lang['bigbrother.options']                       = 'Einstellungen';
$_lang['bigbrother.save_settings']                 = 'Einstellungen speich.';
$_lang['bigbrother.general_options']               = 'Allgemeines';
$_lang['bigbrother.dashboard_options']             = 'Dashboard';
$_lang['bigbrother.account_options']               = 'Konten';

/* Options panel - cmp options */
$_lang['bigbrother.accounts_list']                 = 'Kontenliste';
$_lang['bigbrother.accounts_list_desc']            = 'Wählen Sie ein Konto, das für den Bericht verwendet werden soll';

$_lang['bigbrother.date_range']                    = 'Datumsbereich';
$_lang['bigbrother.date_range_desc']               = 'Wählen Sie den Datumsbereich, der für den Bericht verwendet werden soll';

$_lang['bigbrother.15_days']                       = '15 Tage';
$_lang['bigbrother.30_days']                       = '30 Tage';
$_lang['bigbrother.45_days']                       = '45 Tage';
$_lang['bigbrother.60_days']                       = '60 Tage';

$_lang['bigbrother.today']                         = 'Heute';
$_lang['bigbrother.yesterday']                     = 'Gestern';

$_lang['bigbrother.report_end_date']               = 'End Datum f&uuml;r Bericht';
$_lang['bigbrother.report_end_date_desc']          = 'Auswahl des Zeitpunktes an dem der Bericht enden soll';

$_lang['bigbrother.caching_time']                  = 'Cache Timeout';
$_lang['bigbrother.caching_time_desc']             = 'Maximales Alter der zwischengespeicherten Ergebnisse aus Google Analytics (in Sekunden)';

$_lang['bigbrother.admin_groups']                  = 'Administrator Gruppen';
$_lang['bigbrother.admin_groups_desc']             = 'Komma-separierte Liste der MODx Benutzergruppen die Zugriff auf die Optionen haben';

/* Options panel - dashboard options */
$_lang['bigbrother.show_visits_on_dashboard']      = 'Besuche';
$_lang['bigbrother.show_visits_on_dashboard_desc'] = 'Diagramm für Besuche im Dashboard anzeigen';

$_lang['bigbrother.show_metas_on_dashboard']       = 'Meta Informationen';
$_lang['bigbrother.show_metas_on_dashboard_desc']  = 'Meta Informationen im Dashboard anzeigen';

$_lang['bigbrother.show_pies_on_dashboard']        = 'Besucher und Besucherquellen';
$_lang['bigbrother.show_pies_on_dashboard_desc']   = 'Besucher und Besucherquellen im Dashboard anzeigen';

/* Account Options */
$_lang['bigbrother.user_account_default']          = "Standard";
$_lang['bigbrother.account_options_desc']          = "<p>BigBrother verwendet standardm&auml;&szlig;ig das aus der Erstkonfiguration vordefinierte Konto f&uuml;r den Analytics Bericht.<br />
                                                      Es ist jedoch m&ouml;glich, ein spezifisches Analytics Konto f&uuml;r jeden Manager Benutzer zu definieren.</p>
                                                      <p>Ist einem Benutzer ein spezifisches Analytics Konto zugewiesen, wird dieses f&uuml;r die Anzeige der Analytics Berichte im Dashboard und auf der CMP verwendet.<br />
                                                      Verwenden Sie die unten angef&uuml;hrte Tabelle um einem Benutzer ein anderes Analytics Konto zuzuweisen. Klicken Sie hierzu auf den Wert in der Konto Spalte und w&auml;hlen Sie das gew&uuml;nschte Analytics Konto aus.</p>
                                                      <div class=\"warning\"><p><strong>Hinweis:</strong> In der Benutzerliste werden auch Benutzer angezeigt die keine Zugriffsrechte auf den Manager haben.</p></div>";
$_lang['bigbrother.search_placeholder']            = "Suche...";
$_lang['bigbrother.rowheader_name']                = "Name";
$_lang['bigbrother.rowheader_account']             = "Konto";
