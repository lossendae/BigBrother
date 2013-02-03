<?php
/**
 * MGR Swedish Lexicon Entries for BigBrother
 *
 * @package bigbrother
 * @subpackage lexicon
 * @author Joakim Nyman <joakim@fractalwolfe.com>
 *
 */
$_lang['bigbrother.main_title']                    = 'Google Analytics';

/* Alert */
$_lang['bigbrother.alert_failed']                  = 'Misslyckades';

/* Action buttons - modAB */
$_lang['bigbrother.revoke_authorization']          = 'Upphäv auktorisation';
$_lang['bigbrother.revoke_permission']             = 'Upphäv tillstånd?';
$_lang['bigbrother.revoke_permission_msg']         = 'Om du upphäver tillståndet kommer du behöva gå igenom inställningsprocessen igen för att auktorisera MODX att använda Google Analytics APIn.<br />
                                                      <br />
                                                      Är du säker att du vill upphäva tillståndet?
                                                      <span class="warning"><strong>Obs:</strong> Alla åsidosättande kontoinställningar som givits åt användare kommer även att raderas.</span>';

/* Authenticate */
$_lang['bigbrother.account_authentication_desc']   = 'Använd knappen nedanför för att auktorisera MODX att använda Google Analytics API.</p>
                                                      <p><em>Du kommer att bli omdirigerad till auktoriseringssidan för Google. När auktoriseringen är slutför kommer du att skickas tillbaka hit för att välja vilket konto du vill använda till analytics rapporterna.</em>';
$_lang['bigbrother.bd_root_desc']                  = 'Kontrollerar om SimpleXML och cURL PHP tilläggen är aktiverade innan vi fortsätter till inloggningsskärmen';
$_lang['bigbrother.bd_root_crumb_text']            = 'Kontrollera förutsättningar';

$_lang['bigbrother.verify_prerequisite_settings']  = 'Kontrollera inställningar för förutsättningar';
$_lang['bigbrother.start_the_login_process']       = 'Påbörja inloggningsprocessen';
$_lang['bigbrother.callback_label']                = 'Callback URL';
$_lang['bigbrother.callback_label_under']          = 'Om webbadressen given i detta fält inte matchar webbadressen för den aktuella sidan, kopiera och klistra in den aktuella webbadressen från webbläsarens adressfält.';

/* Oauth complete */
$_lang['bigbrother.bd_oauth_complete_in_progress'] = 'Autentisering pågår...';
$_lang['bigbrother.bd_oauth_authorize']            = 'Godkänn';
$_lang['bigbrother.oauth_select_account']          = 'Välj ett konto...';
$_lang['bigbrother.oauth_btn_select_account']      = 'Välj detta konto och visa rapporten';

/* Oauth response */
$_lang['bigbrother.err_load_oauth']                = 'Kunde inte ladda OAuth klassen som krävs. Vänligen installera om komponenten eller kontakta webbansvarig.';

/* mgr - breadcrumbs */
$_lang['bigbrother.bd_authorize']                  = 'Auktorisera';
$_lang['bigbrother.bd_choose_an_account']          = 'Välj ett konto';

/* mgr - Authenticate Ajax response strings */
$_lang['bigbrother.class_simplexml']               = '<strong>Det verkar som att <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> inte har kompilerats för din version av PHP.<br />
                                                      Denna komponent krävs för att denna insticksmodul skall fungera korrekt.</strong>';
$_lang['bigbrother.function_curl']                 = '<strong>Det verkar som att <a href="http://www.php.net/manual/en/book.curl.php">cURL</a> inte har kompilerats för din version av PHP.<br />
                                                      Denna komponent krävs för att denna insticksmodul skall fungera korrekt.</strong>';
$_lang['bigbrother.redirect_to_google']            = 'Omdirigerar till Google, var god vänta...';
$_lang['bigbrother.authentification_complete']     = 'Autentisering slutförd.</p>
                                                      <p>Välj det konto som du vill använda som standard ur listan nedanför.<br />
                                                      Du kan när som helst välja ett annat konto på infopanelen.';
$_lang['bigbrother.account_set_succesfully_wait']  = 'Kontot ställdes in framgångsrikt! Var god vänta...';
$_lang['bigbrother.not_authorized_to']             = 'Du har inte rättighet att utföra denna operation. Vänligen kontakta webbplatsens administratör.';

/* Reports */
$_lang['bigbrother.desc_markup']                   = '<h3>{title}<span>{date_begin} - {date_end}</span></h3><div class="account-infos">{name}<span>{id}</span></div>';
$_lang['bigbrother.loading']                       = 'Laddar...';

/* Content Overview */

$_lang['bigbrother.content']                       = 'Innehåll';
$_lang['bigbrother.content_overview']              = 'Innehållsöversikt';
$_lang['bigbrother.site_content']                  = 'Webbsidans innehåll';
$_lang['bigbrother.visits_comparisons']            = 'Besök i jämförelse till föregående månad';

/* Audience Overview */
$_lang['bigbrother.audience']                      = 'Publik';
$_lang['bigbrother.audience_overview']             = 'Publiköversikt';
$_lang['bigbrother.audience_visits']               = 'Besök';

$_lang['bigbrother.demographics']                  = 'Demografi';
$_lang['bigbrother.language']                      = 'Språk';
$_lang['bigbrother.country']                       = 'Land / Område';

$_lang['bigbrother.system']                        = 'System';
$_lang['bigbrother.browser']                       = 'Webbläsare';
$_lang['bigbrother.operating_system']              = 'Operativsystem';
$_lang['bigbrother.service_provider']              = 'Tjänsteleverantör';

$_lang['bigbrother.mobile']                        = 'Mobil';
$_lang['bigbrother.screen_resolution']             = 'Skärmupplösning';

/* Traffic sources Overview */
$_lang['bigbrother.traffic_sources']               = 'Trafikkällor';
$_lang['bigbrother.traffic_sources_overview']      = 'Översikt för trafikkällor';
$_lang['bigbrother.traffic_sources_visits']        = 'Besök';

$_lang['bigbrother.organic_source']                = 'Sökmotorer';
$_lang['bigbrother.keyword']                       = 'Sökmotor sökord';
$_lang['bigbrother.referral_source']               = 'Hänvisande webbplatser';
$_lang['bigbrother.landing_page']                  = 'Målsida';

/* Misc - Dimensions */
$_lang['bigbrother.none']                          = '(ingen)';
$_lang['bigbrother.direct_traffic']                = 'Direkt trafik';

$_lang['bigbrother.search_traffic']                = 'organisk';
$_lang['bigbrother.referral_traffic']              = 'hänvisning';

$_lang['bigbrother.search_traffic_replace_with']   = 'Sökmotorer';
$_lang['bigbrother.referral_traffic_replace_with'] = 'Hänvisande webbplatser';

/* Misc - Metrics */
$_lang['bigbrother.visits_and_uniques']            = 'Besök och unika besök';
$_lang['bigbrother.avg_time_on_site']              = 'Genomsnittlig tid på webbplats';
$_lang['bigbrother.page']                          = 'Sida';
$_lang['bigbrother.pagetitle']                     = 'Sidrubrik';
$_lang['bigbrother.pageviews']                     = 'Sidvisningar';
$_lang['bigbrother.pageviews_per_visit']           = 'Sidor / besök';
$_lang['bigbrother.unique_pageviews']              = 'Unika sidvisningar';
$_lang['bigbrother.bounce_rate']                   = 'Avvisningsfrekvens';
$_lang['bigbrother.visits']                        = 'Besök';
$_lang['bigbrother.visitors']                      = 'Besökare';
$_lang['bigbrother.percent_visits']                = '% besök';
$_lang['bigbrother.exit_rate']                     = '% utgångar';
$_lang['bigbrother.new_visits']                    = 'Nya besök';
$_lang['bigbrother.new_visits_in_percent']         = '% nya besök';
$_lang['bigbrother.direct_traffic']                = 'Direkt trafik';
$_lang['bigbrother.search_engines']                = 'Sökmotorer';

/* Options panel */
$_lang['bigbrother.google_analytics_options']      = 'Google Analytics inställningar';
$_lang['bigbrother.options']                       = 'Inställningar';
$_lang['bigbrother.save_settings']                 = 'Spara inställningar';
$_lang['bigbrother.general_options']               = 'Allmänna inställningar';
$_lang['bigbrother.dashboard_options']             = 'Infopanelsinställningar';
$_lang['bigbrother.account_options']               = 'Kontoinställningar';

/* Options panel - cmp options */
$_lang['bigbrother.accounts_list']                 = 'Kontolista';
$_lang['bigbrother.accounts_list_desc']            = 'Välj det konto du vill använda för dina rapporter';

$_lang['bigbrother.date_range']                    = 'Datumintervall';
$_lang['bigbrother.date_range_desc']               = 'Välj datumintervall för dina rapporter';

$_lang['bigbrother.15_days']                       = '15 dagar';
$_lang['bigbrother.30_days']                       = '30 dagar';
$_lang['bigbrother.45_days']                       = '45 dagar';
$_lang['bigbrother.60_days']                       = '60 dagar';

$_lang['bigbrother.today']                         = 'Idag';
$_lang['bigbrother.yesterday']                     = 'Igår';

$_lang['bigbrother.report_end_date']               = 'Rapportens slutdatum';
$_lang['bigbrother.report_end_date_desc']          = 'Välj det datum vid vilket rapporterna skall sluta';

$_lang['bigbrother.caching_time']                  = 'Caching tid';
$_lang['bigbrother.caching_time_desc']             = 'Hur länge rapporterna skall lagras i lokal cache (i sekunder)';

$_lang['bigbrother.admin_groups']                  = 'Administratörsgrupper';
$_lang['bigbrother.admin_groups_desc']             = 'Komma-separerad lista med administratörsgrupper som har tillgång denna inställningspanel';

/* Options panel - dashboard options */
$_lang['bigbrother.show_visits_on_dashboard']      = 'Besök';
$_lang['bigbrother.show_visits_on_dashboard_desc'] = 'Visa besök på infopanelen';

$_lang['bigbrother.show_metas_on_dashboard']       = 'Information';
$_lang['bigbrother.show_metas_on_dashboard_desc']  = 'Visa metainformation på infopanelen';

$_lang['bigbrother.show_pies_on_dashboard']        = 'Besökare och trafikkällor';
$_lang['bigbrother.show_pies_on_dashboard_desc']   = 'Visa cirkeldiagram för besökare och trafikkällor på infopanelen';

/* Account Options */
$_lang['bigbrother.user_account_default']          = "standard";
$_lang['bigbrother.account_options_desc']          = "<p>Bigbrother använder ett standard förvalt konto till Analytics rapporterna.<br />
                                                      Det är dock möjligt att ange ett specifikt Google Analytics konto per MODX användare för att åsidosätta standardinställningarna.</p>
                                                      <p>En användare som tilldelats ett specifikt konto kommer att använda det både till CMPn och infopanelen.<br />
                                                      Använd rutnätet nedanför för att välja ett konto genom att klicka på värdet i kontokolumnen. En lista med alla tillgängliga konton kommer då att visas.</p>
                                                      <div class=\"warning\"><p><strong>Obs:</strong> Användarlistan visar alla användare oberoende om de har tillgång till hanteraren eller ej.</p></div>";
$_lang['bigbrother.search_placeholder']            = "Sök...";
$_lang['bigbrother.rowheader_name']                = "Namn";
$_lang['bigbrother.rowheader_account']             = "Konto";
