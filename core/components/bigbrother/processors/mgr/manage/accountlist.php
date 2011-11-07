<?php
/**
 * Get account list
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;

$response['message'] = '';
$response['success'] = true;

if(!$ga->loadOAuth()){
	$response['message'] = 'Could not load the OAuth file';
	$response['success'] = false;
	return $modx->toJSON($response);
}

$ch = curl_init();
		
curl_setopt($ch, CURLOPT_URL, $ga->baseUrl . 'accounts/default');
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
curl_setopt($ch, CURLOPT_HTTPHEADER, array($ga->createAuthHeader($ga->baseUrl . 'accounts/default', 'GET')));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$return = curl_exec($ch);
if(curl_errno($ch)){
	$response['message'] = curl_error($ch);
	$response['success'] = false;
	return $modx->toJSON($response);
}

$this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if($this->http_code != 200)	{
	$response['message'] = $return;
	$response['success'] = false;
	return $modx->toJSON($response);
} else {
	$this->error_message = '';
	$xml = new SimpleXMLElement($return);

	curl_close($ch);

	$vhash = array();
	foreach($xml->entry as $entry) {
		$value = (string)$entry->id;
		list($part1, $part2) = explode('accounts/', $value);
		
		$account['name'] = (string)$entry->title;
		$account['id'] = $part2;		
		$vhash[] = $account;
	}
	$response['results'] = $vhash;
}
return $modx->toJSON($response);