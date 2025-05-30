<?php

class WP_CustomMenu_Block_Specialmenus extends Mage_Catalog_Block_Navigation
{
    public function getArrayMenuInicio()
    {
        return array(
			array(
				'ativo'=>true,
				'id'=>1,
				'url'=>'',
				'texto'=>"Páginas",
				'children'=>array(
					array(
						'ativo'=>true,
						'id'=>2,
						'url'=>"politica-se-entrega",
						'texto'=>"Pol&iacute;tica de Entrega"
					),
					array(
						'ativo'=>true,
						'id'=>3,
						'url'=>"politica-de-privacidade",
						'texto'=>"Pol&iacute;tica de Privacidade"
					),
					array(
						'ativo'=>true,
						'id'=>4,
						'url'=>"quem-somos",
						'texto'=>"Quem Somos"
					),
					array(
						'ativo'=>true,
						'id'=>5,
						'url'=>"seja-um-representante-biopro",
						'texto'=>"Seja um Representante Biopr&oacute;"
					),
					array(
						'ativo'=>true,
						'id'=>6,
						'url'=>"troca-e-devolucoes",
						'texto'=>"Troca e Devolu&ccedil;&otilde;es"
					)
				)
			)
		);
    }
    public function getArrayMenuFim()
    {
        return array(
			array(
				'ativo'=>true,
				'id'=>1,
				'url'=>"area-do-distribuidor",
				'texto'=>"&Aacute;rea do distribuidor"
			),
			array(
				'ativo'=>true,
				'id'=>1,
				'url'=>"acessorios",
				'texto'=>"Acessórios"
			)
		);
    }
}
