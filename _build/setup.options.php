<?php
/**
* Build the setup options form.
*
* @package bigbrother
* @subpackage build
*/
/* Default value */
$values = array(
    'admin_groups' => 'Administrator',
    'cache_timeout' => 300,
);
switch ($options[xPDOTransport::PACKAGE_ACTION]) {
    case xPDOTransport::ACTION_INSTALL:
    case xPDOTransport::ACTION_UPGRADE:
        $setting = $modx->getObject('modSystemSetting',array('key' => 'bigbrother.admin_groups'));
        if ($setting != null) { $values['admin_groups'] = $setting->get('value'); }
        unset($setting);
		
        $setting = $modx->getObject('modSystemSetting',array('key' => 'bigbrother.cache_timeout'));
        if ($setting != null) { $values['cache_timeout'] = $setting->get('value'); }
        unset($setting);
    break;
    case xPDOTransport::ACTION_UNINSTALL: break;
}


$output = '<label for="admin_groups">Administrator Groups:</label>
<input type="text" name="admin_groups" id="admin_groups" width="300" value="'.$values['admin_groups'].'" />
<br /><br />';

$output .= '<label for="cache_timeout">How long should report results should be cached locally (in seconds):</label>
<input type="text" name="cache_timeout" id="cache_timeout" width="300" value="'.$values['cache_timeout'].'" />
<br /><br />';

return $output;