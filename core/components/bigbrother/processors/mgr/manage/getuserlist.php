<?php
/**
 * Get account list
 *
 * @package bigbrother
 * @subpackage processors
 */
$ga =& $modx->bigbrother;
$response['success'] = false;
$data = array();
$start = $scriptProperties['start'];
$limit = $scriptProperties['limit'];

/* Subquery for account name */
$subQuery = $modx->newQuery('modUserSetting');
$subQuery->select(array(
    $modx->getSelectColumns('modUserSetting', 'modUserSetting', '', array('value')),
));
$subQuery->where(array(
    'key' => 'bigbrother.account_name',
    '`modUserSetting`.`user` = `modUser`.`id`',
));
$subQuery->prepare();

/* Main query */
$query = $modx->newQuery('modUser');
$query->select(array(
    $modx->getSelectColumns('modUser', 'modUser', '', array('id')),
    $modx->getSelectColumns('modUserProfile', 'Profile', '', array('fullname')),
    '('. $subQuery->toSQL() .') AS `account`',
));
$query->leftJoin('modUserProfile', 'Profile');
$query->sortBy('id');
$query->limit($limit, $start);

$users = $modx->getCollection('modUser', $query);
foreach($users as $user){
    $row['id'] = $user->get('id'); 
    $row['fullname'] = !empty( $user->fullname ) ? $user->fullname : $user->username; 
    $row['account'] = empty( $user->account ) ? $modx->lexicon('bigbrother.user_account_default') : $user->account; 
    $data[] = $row;
}

/* Query should be prepared for getCount method - @TODO ask the team why ? */
$response['total'] = $modx->getCount('modUser', $query->prepare());
$response['success'] = true;
$response['data'] = $data;
return $modx->toJSON($response);