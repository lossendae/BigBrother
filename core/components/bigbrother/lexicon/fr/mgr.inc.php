<?php
/**
 * MGR French Lexicon Entries for BigBrother
 *
 * @package bigbrother
 * @subpackage lexicon
 *
 */
$_lang['bigbrother.main_title']                    = 'Google Analytics';

/* Alert */
$_lang['bigbrother.alert_failed']                  = 'Échec';

/* Action buttons - modAB */
$_lang['bigbrother.revoke_authorization']          = 'Révoquer l\'autorisation';
$_lang['bigbrother.revoke_permission']             = 'Révoquer les permissions ?';
$_lang['bigbrother.revoke_permission_msg']         = "En révoquant l'autorisation, vous devrez passer à nouveau par le processus de configuration pour authoriser MODx à acceder a l'API de Google.<br />
                                                      <br />
                                                      Êtes-vous sûr de vouloir révoquer les autorisations.
                                                      <span class=\"warning\"><strong>Note : </strong>Tous les comptes assignés aux utilisateurs seront également supprimés.</span>";

/* Authenticate */
$_lang['bigbrother.account_authentication_desc']   = 'Utilisez le bouton ci-dessous pour autoriser MODX à accéder à l\'API de Google Analytics.</p>
                                                      <p><em>Vous allez être redirigé vers la page d\'identification de Google. Une fois identifié, vous serrez redirigé vers cette présente page et vous pourrez choisir le compte Google Analytics que vous souhaitez utiliser.</em>';
$_lang['bigbrother.bd_root_desc']                  = 'Vérifie si SimpleXML et l\'extension PHP cURL sont activées avant de continuer la phase d\'authentification';
$_lang['bigbrother.bd_root_crumb_text']            = 'Vérification des pré-requis';

$_lang['bigbrother.verify_prerequisite_settings']  = 'Vérification des paramètres pré-requis';
$_lang['bigbrother.start_the_login_process']       = 'Démarrer le processus d\'authentification';
$_lang['bigbrother.callback_label']                = 'Callback URL';
$_lang['bigbrother.callback_label_under']          = "Si l'URL spécifiée dans ce champ ne correspond pas à la page ou vous vous trouvez, copier/coller l'URL en cours dans le champ.";

/* Oauth complete */
$_lang['bigbrother.bd_oauth_complete_in_progress'] = 'Authentification en cours...';
$_lang['bigbrother.bd_oauth_authorize']            = 'Authorisation';
$_lang['bigbrother.oauth_select_account']          = 'Sélectionnez un compte...';
$_lang['bigbrother.oauth_btn_select_account']      = 'Sélectionner ce compte et visualiser les rapports';

/* Oauth response */
$_lang['bigbrother.err_load_oauth']                = "Impossible de charger la classe OAuth nécessaire. Veuillez réinstaller le composant ou contacter le webmaster.";

/* mgr - breadcrumbs */
$_lang['bigbrother.bd_authorize']                  = 'Autorisation';
$_lang['bigbrother.bd_choose_an_account']          = 'Choisissez un compte';

/* mgr - Authenticate Ajax response strings */
$_lang['bigbrother.class_simplexml']               = '<strong>Il semblerait que <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> ne soit pas compilé dans votre version de PHP.<br />
                                                      Il est requis par le plugin pour fonctionner correctement.</strong>';
$_lang['bigbrother.function_curl']                 = '<strong>Il semblerait que <a href="http://www.php.net/manual/en/book.curl.php">cURL</a>  ne soit pas compilé dans votre version de PHP.<br />
                                                      Il est requis par le plugin pour fonctionner correctement.</strong>';
$_lang['bigbrother.redirect_to_google']            = 'Redirection sur le site de Google, veuillez patienter...';
$_lang['bigbrother.authentification_complete']     = 'Authentification terminée.</p>
                                                      <p>Sélectionnez le compte que vous désirez utiliser par défaut dans la liste ci-dessous.<br />
                                                      Vous pourrez à tout moment changez de compte via les options du CMP.';
$_lang['bigbrother.account_set_succesfully_wait']  = 'Compte sélectionné avec succès! Veuillez patienter...';
$_lang['bigbrother.not_authorized_to']             = "Vous n'avez pas l'autorisation de faire cette opération. Veuillez contacter l'administrateur du site.";

/* Reports */
$_lang['bigbrother.desc_markup']                   = '<h3>{title}<span>{date_begin} - {date_end}</span></h3><div class="account-infos">{name}<span>{id}</span></div>';
$_lang['bigbrother.loading']                       = 'Chargement...';

/* Content Overview */

$_lang['bigbrother.content']                       = 'Contenu';
$_lang['bigbrother.content_overview']              = 'Vue d\'ensemble du Contenu';
$_lang['bigbrother.site_content']                  = 'Site Content';
$_lang['bigbrother.visits_comparisons']            = 'Visites par rapport au mois précédent';

/* Audience Overview */
$_lang['bigbrother.audience']                      = 'Audience';
$_lang['bigbrother.audience_overview']             = 'Vue d\'ensemble de l\'Audience';
$_lang['bigbrother.audience_visits']               = 'Visites';

$_lang['bigbrother.demographics']                  = 'Démographiques';
$_lang['bigbrother.language']                      = 'Langues';
$_lang['bigbrother.country']                       = 'Pays';

$_lang['bigbrother.system']                        = 'Système';
$_lang['bigbrother.browser']                       = 'Navigateur';
$_lang['bigbrother.operating_system']              = 'Système d\'exploitation';
$_lang['bigbrother.service_provider']              = 'Fournisseurs d\'accès';

$_lang['bigbrother.mobile']                        = 'Mobile';
$_lang['bigbrother.screen_resolution']             = 'Résolution d\'écran';

/* Traffic sources Overview */
$_lang['bigbrother.traffic_sources']               = 'Sources de Trafic';
$_lang['bigbrother.traffic_sources_overview']      = 'Vue d\'ensemble des Sources de Trafic';
$_lang['bigbrother.traffic_sources_visits']        = 'Visites';

$_lang['bigbrother.organic_source']                = 'Moteurs de recherches';
$_lang['bigbrother.keyword']                       = 'Mots clés';
$_lang['bigbrother.referral_source']               = 'Sites référents';
$_lang['bigbrother.landing_page']                  = 'Page de destination';

/* Misc - Dimensions */
$_lang['bigbrother.none']                          = '(aucune)';
$_lang['bigbrother.direct_traffic']                = 'Accès directs';

$_lang['bigbrother.search_traffic']                = 'organic';
$_lang['bigbrother.referral_traffic']              = 'referral';

$_lang['bigbrother.search_traffic_replace_with']   = 'Moteurs de recherches';
$_lang['bigbrother.referral_traffic_replace_with'] = 'Sites référents';

/* Misc - Metrics */
$_lang['bigbrother.visits_and_uniques']            = 'Visites et Visiteurs Uniques';
$_lang['bigbrother.avg_time_on_site']              = 'Temps moyen passé sur la page';
$_lang['bigbrother.page']                          = 'Page';
$_lang['bigbrother.pagetitle']                     = 'Titre de la page';
$_lang['bigbrother.pageviews']                     = 'Pages vues';
$_lang['bigbrother.pageviews_per_visit']           = 'Pages / Visite';
$_lang['bigbrother.unique_pageviews']              = 'Consultations uniques';
$_lang['bigbrother.bounce_rate']                   = 'Taux de rebond';
$_lang['bigbrother.visits']                        = 'Visites';
$_lang['bigbrother.visitors']                      = 'Visiteurs';
$_lang['bigbrother.percent_visits']                = '% Visites';
$_lang['bigbrother.exit_rate']                     = 'Sorties (en %)';
$_lang['bigbrother.new_visits']                    = 'Nouvelles Visites';
$_lang['bigbrother.new_visits_in_percent']         = 'Nouvelles Visites (en %)';
$_lang['bigbrother.direct_traffic']                = 'Accès directs';
$_lang['bigbrother.search_engines']                = 'Moteurs de recherches';

/* Options panel */
$_lang['bigbrother.google_analytics_options']      = 'Google Analytics Options';
$_lang['bigbrother.options']                       = 'Options';
$_lang['bigbrother.save_settings']                 = 'Sauvegarder';
$_lang['bigbrother.general_options']               = 'Options Générales';
$_lang['bigbrother.dashboard_options']             = 'Options du Dashboard';
$_lang['bigbrother.account_options']               = 'Options de comptes';

/* Options panel - cmp options */
$_lang['bigbrother.accounts_list']                 = 'Liste des comptes disponibles';
$_lang['bigbrother.accounts_list_desc']            = 'Sélectionnez le compte que vous souhaitez utiliser pour vos rapports';

$_lang['bigbrother.date_range']                    = 'Plage de date';
$_lang['bigbrother.date_range_desc']               = 'Séléctionnez la plage de date pour vos rapports';

$_lang['bigbrother.15_jours']                      = '15 jours';
$_lang['bigbrother.30_jours']                      = '30 jours';
$_lang['bigbrother.45_jours']                      = '45 jours';
$_lang['bigbrother.60_jours']                      = '60 jours';

$_lang['bigbrother.today']                         = 'Aujourd\'hui';
$_lang['bigbrother.yesterday']                     = 'Hier';

$_lang['bigbrother.report_end_date']               = 'Date de fin de rapport';
$_lang['bigbrother.report_end_date_desc']          = 'Sélectionnez la date de fin de rapport';

$_lang['bigbrother.caching_time']                  = 'Temps de cache';
$_lang['bigbrother.caching_time_desc']             = 'Durée, en secondes, pendant laquelle les résultats doivent être mis en cache';

$_lang['bigbrother.admin_groups']                  = 'Groupes d\'Administrateurs';
$_lang['bigbrother.admin_groups_desc']             = 'Liste de groupes d\'utilisateurs MODx séparé par des virgules ayant accès aux options';

/* Options panel - dashboard options */
$_lang['bigbrother.show_visits_on_dashboard']      = 'Dashboard Widget - Visites';
$_lang['bigbrother.show_visits_on_dashboard_desc'] = 'Montrer les Visites sur le dashboard';

$_lang['bigbrother.show_metas_on_dashboard']       = 'Dashboard Widget - Metas';
$_lang['bigbrother.show_metas_on_dashboard_desc']  = 'Montrer les metas informations sur le dashboard';

$_lang['bigbrother.show_pies_on_dashboard']        = 'Dashboard Widget - Aperçu des visiteurs et des sources de trafic';
$_lang['bigbrother.show_pies_on_dashboard_desc']   = 'Afficher les visiteurs et les sources de trafic sur le tableau de bord';

/* Account Options */
$_lang['bigbrother.user_account_default']          = "default";
$_lang['bigbrother.account_options_desc']          = "<p>Bigbrother par défaut utilise un compte pré-selectionné pour les rapports d'analyse.<br />
                                                      Toutefois, il est possible de selectionner un compte specifique par utilisateur qui aura la priorité sur le compte par défaut.</p>
                                                      <p>Le compte séléectionné sera alors utilisé pour le CMP et le dashboard pour les rapports d'analyse<br />
                                                      Utilisez la grille ci-dessous pour selectionner un compte sur la gauche en cliquant sur la colonne \"compte\", une liste des compte disponibles apparaîtra.</p>
                                                      <div class=\"warning\"><p><strong>Note : </strong>La liste des utilisateurs montre tous les utilisateurs indépendemment du fait qu'il aient accès au manager.</p></div>";
$_lang['bigbrother.search_placeholder']            = "Rechercher...";
$_lang['bigbrother.rowheader_name']                = "Nom";
$_lang['bigbrother.rowheader_account']             = "Compte";
