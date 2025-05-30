<?php
$installer 	= $this;
$connection = $installer->getConnection();
$installer->startSetup();
 
$installer->getConnection()
    ->addColumn(
		$installer->getTable('imageslider/imageslider'),
		'linktarget',
		array(
			'type' => Varien_Db_Ddl_Table::TYPE_TEXT,
			'nullable' => true,
			'length' => 255,
			'default'=> '_self',
			'comment' => 'Link Target'
		)
);
$installer->getConnection()
    ->addColumn(
		$installer->getTable('imageslider/imageslider'),
		'sort_order',
		array(
			'type' => Varien_Db_Ddl_Table::TYPE_SMALLINT,
			'nullable' => true,
			'length' => 5,
			'default'=> '0',
			'comment' => 'Sort Order'
		)
);
$installer->endSetup();