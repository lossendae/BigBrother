<?php
/**
 * Manager English Lexicon Entries for Big Brother
 *
 * @package bigbrother
 * @subpackage lexicon
 */
$_lang['bigbrother.main_title'] = 'Google Analytics';

/* Alert */
$_lang['bigbrother.alert_failed'] = 'Failed';

/* Action buttons - modAB */
$_lang['bigbrother.change_account'] = 'Change account';
$_lang['bigbrother.select_another_account'] = 'Select another account';
$_lang['bigbrother.select_another_account_desc'] = 'Select the account you want to set as default for your report.<br/> Once validated, the page will reload to show the report for the choosen account';
$_lang['bigbrother.revoke_authorization'] = 'Revoke authorization';

$_lang['bigbrother.revoke_permission'] = 'Revoke permission ?';
$_lang['bigbrother.revoke_permission_msg'] = "By revoking permission, you'll have to go through the setup process again to authorize MODx to use Google Analytics's APIs. <br/> Are you sure you want to revoke permissions ?";


/* Authenticate */
$_lang['bigbrother.bd_root_desc'] = 'Verifying if SimpleXML and cURL PHP extensions are activated before proceeding to the login screen';
$_lang['bigbrother.bd_root_crumb_text'] = 'Verify Prerequisite';

$_lang['bigbrother.verify_prerequisite_settings'] = 'Verify Prerequisite Settings';
$_lang['bigbrother.start_the_login_process'] = 'Start the login process';

/* Oauth complete */
$_lang['bigbrother.bd_oauth_complete_in_progress'] = 'Authentification in progress...';
$_lang['bigbrother.bd_oauth_authorize'] = 'Authorize';
$_lang['bigbrother.oauth_select_account'] = 'Select an account...';
$_lang['bigbrother.oauth_btn_select_account'] = 'Select this account and view the report';

/* Oauth response */
$_lang['bigbrother.err_load_oauth'] = 'Could not load the required OAuth class. Please reinstall the component or contact the webmaster.';

/* mgr - breadcrumbs */
$_lang['bigbrother.bd_authorize'] = 'Authorize';
$_lang['bigbrother.bd_choose_an_account'] = 'Choose an Account';

/* mgr - Authenticate Ajax response strings */
$_lang['bigbrother.class_simplexml'] = '<strong>It appears that <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> is not compiled into your version of PHP.<br/> It is required for this plugin to function correctly.</strong>';
$_lang['bigbrother.function_curl'] = '<strong>It appears that <a href="http://www.php.net/manual/en/book.curl.php">cURL</a> is not compiled into your version of PHP.<br/> It is required for this plugin to function correctly.</strong>';
$_lang['bigbrother.redirect_to_google'] = 'Redirect to Google, please wait...';
$_lang['bigbrother.authentification_complete'] = 'Authentification complete.</p><p>Select the account you wish to use by default in the list below.<br/> At any time, you will be able to select another account in the dashboard.';
$_lang['bigbrother.account_set_succesfully_wait'] = 'Account set successfully! Please wait...';

/* Reports */
$_lang['bigbrother.desc_markup'] = '<p>{title}<span class="account-name">{name}<span>{id}</span></span></p>';
$_lang['bigbrother.loading'] = 'Loading...';

/* Content Overview */

$_lang['bigbrother.content'] = 'Content';
$_lang['bigbrother.content_overview'] = 'Content Overview';
$_lang['bigbrother.site_content'] = 'Site Content';

/* Audience Overview */
$_lang['bigbrother.audience'] = 'Audience';
$_lang['bigbrother.audience_overview'] = 'Audience Overview';
$_lang['bigbrother.audience_visits'] = 'Visits';

$_lang['bigbrother.demographics'] = 'Demographics';
$_lang['bigbrother.language'] = 'Language';
$_lang['bigbrother.country'] = 'Country / Territory';

$_lang['bigbrother.system'] = 'System';
$_lang['bigbrother.browser'] = 'Browser';
$_lang['bigbrother.operating_system'] = 'Operating System';
$_lang['bigbrother.service_provider'] = 'Service Provider';

$_lang['bigbrother.mobile'] = 'Mobile';
$_lang['bigbrother.screen_resolution'] = 'Screen Resolution';

/* Traffic sources Overview */
$_lang['bigbrother.traffic_sources'] = 'Traffic Sources';
$_lang['bigbrother.traffic_sources_overview'] = 'Traffic Sources Overview';
$_lang['bigbrother.traffic_sources_visits'] = 'Visits';

$_lang['bigbrother.search_traffic'] = 'Search Traffic';
$_lang['bigbrother.keyword'] = 'Keyword';

$_lang['bigbrother.referral_traffic'] = 'Referral Traffic';
$_lang['bigbrother.source'] = 'Source';

$_lang['bigbrother.direct_traffic'] = 'Direct Traffic';
$_lang['bigbrother.landing_page'] = 'Landing Page';

/* Misc */
$_lang['bigbrother.visits_and_uniques'] = 'Visits and Uniques';
$_lang['bigbrother.avg_time_on_site'] = 'Avg. Time on Site';
$_lang['bigbrother.page'] = 'Page';
$_lang['bigbrother.pagetitle'] = 'Page Title';
$_lang['bigbrother.pageviews'] = 'Pageviews';
$_lang['bigbrother.pageviews_per_visit'] = 'Pages / Visit';
$_lang['bigbrother.unique_pageviews'] = 'Unique Pageviews';
$_lang['bigbrother.bounce_rate'] = 'Bounce Rate';
$_lang['bigbrother.visits'] = 'Visits';
$_lang['bigbrother.visitors'] = 'Visitors';
$_lang['bigbrother.percent_visits'] = '% Visits';
$_lang['bigbrother.new_visits'] = 'New Visits';
$_lang['bigbrother.new_visits_in_percent'] = '% New Visits';
$_lang['bigbrother.direct_traffic'] = 'Direct Traffic';
$_lang['bigbrother.search_engines'] = 'Search Engines';
$_lang['bigbrother.referring_sites'] = 'Referring Sites';