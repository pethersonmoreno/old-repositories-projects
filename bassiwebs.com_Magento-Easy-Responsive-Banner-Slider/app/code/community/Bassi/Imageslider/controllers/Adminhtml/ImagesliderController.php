<?php
/**
 *
 * Version			: 1.0.4
 * Edition 			: Community 
 * Compatible with 	: Magento 1.5.x to latest
 * Developed By 	: Magebassi
 * Email			: magebassi@gmail.com
 * Web URL 			: www.magebassi.com
 * Extension		: Magebassi Easy Banner slider
 * 
 */
?>
<?php

class Bassi_Imageslider_Adminhtml_ImagesliderController extends Mage_Adminhtml_Controller_Action
{

	protected function _initAction() {
		$this->loadLayout()
			->_setActiveMenu('imageslider/items')
			->_addBreadcrumb(Mage::helper('adminhtml')->__('Banners Manager'), Mage::helper('adminhtml')->__('Banner Manager'));
		
		return $this;
	}   
 
	public function indexAction() {
	
		$this->_title($this->__('Imageslider'))
			->_title($this->__('Manage banner'));
		$this->_initAction()
			->renderLayout();
	}

	public function editAction() {
		$id     = $this->getRequest()->getParam('id');
		$model  = Mage::getModel('imageslider/imageslider')->load($id);

		if ($model->getId() || $id == 0) {
			$data = Mage::getSingleton('adminhtml/session')->getFormData(true);
			if (!empty($data)) {
				$model->setData($data);
			}

			Mage::register('imageslider_data', $model);
			
			$this->_title($this->__('Imageslider'))
				->_title($this->__('Manage banner'));
			if ($model->getId()){
				$this->_title($model->getTitle());
			}else{
				$this->_title($this->__('New Banner'));
			}

			$this->loadLayout();
			$this->_setActiveMenu('imageslider/items');

			$this->_addBreadcrumb(Mage::helper('adminhtml')->__('Item Manager'), Mage::helper('adminhtml')->__('Item Manager'));
			$this->_addBreadcrumb(Mage::helper('adminhtml')->__('Item News'), Mage::helper('adminhtml')->__('Item News'));

			$this->getLayout()->getBlock('head')->setCanLoadExtJs(true);

			$this->_addContent($this->getLayout()->createBlock('imageslider/adminhtml_imageslider_edit'))
				->_addLeft($this->getLayout()->createBlock('imageslider/adminhtml_imageslider_edit_tabs'));

			$this->renderLayout();
		} else {
			Mage::getSingleton('adminhtml/session')->addError(Mage::helper('imageslider')->__('Item does not exist'));
			$this->_redirect('*/*/');
		}
	}
 
	public function newAction() {
		$this->_forward('edit');
	}	
 
	public function saveAction() {
		if ($data = $this->getRequest()->getPost()) {

			if(isset($data['filename']))
			{
				if(isset($data['filename']['delete']) && $data['filename']['delete']==1){
					$data['filename']='';
				}
				elseif(is_array($data['filename'])){
					$data['filename']=$data['filename']['value'];
				}
			}
							  			
			$file = new Varien_Io_File();			
			$imageDir = Mage::getBaseDir('media') . DS .  'mbimages';
			$thumbimageyDir = Mage::getBaseDir('media').DS.'mbimages'.DS.'thumbs';
		
			if(!is_dir($imageDir)){
				$imageDirResult = $file->mkdir($imageDir, 0777);         
			}			
			if(!is_dir($thumbimageyDir)){
				$thumbimageDirResult = $file->mkdir($thumbimageyDir, 0777);     
			}			
		
		
			if(isset($_FILES['filename']['name']) && $_FILES['filename']['name'] != '') 
			{
				try {	
					/* Starting upload */	
					$uploader = new Varien_File_Uploader('filename');
				
					// Any extention would work
					$uploader->setAllowedExtensions(array('jpg','jpeg','gif','png'));
					$uploader->setAllowRenameFiles(true);
				
					// Set the file upload mode 
					// false -> get the file directly in the specified folder
					// true -> get the file in the product like folders 
					//	(file.jpg will go in something like /media/f/i/file.jpg)
					$uploader->setFilesDispersion(true);
						
					// We set media as the upload dir
					//$path = Mage::getBaseDir('media') . DS ;
					$path = $imageDir . DS ;
					$result = $uploader->save($path, $_FILES['filename']['name']);
					$file = str_replace(DS, '/', $result['file']);
					###############################################################################
					// actual path of image
					$imageUrl = Mage::getBaseDir('media').DS."mbimages".$file;
					 
					// path of the resized image to be saved
					// here, the resized image is saved in media/resized folder
					$imageResized = Mage::getBaseDir('media').DS."mbimages".DS."thumbs".DS."mbimages".$file;					
					 
					// resize image only if the image file exists and the resized image file doesn't exist
					// the image is resized proportionally with the width/height 135px
					if (!file_exists($imageResized)&&file_exists($imageUrl)) :
						$imageObj = new Varien_Image($imageUrl);
						$imageObj->constrainOnly(TRUE);
						$imageObj->keepAspectRatio(FALSE);
						$imageObj->keepFrame(FALSE);
						$imageObj->quality(100);
						$imageObj->resize(80, 50);
						$imageObj->save($imageResized);
					endif;				
				
					$data['filename'] = 'mbimages'.$file;
				} catch (Exception $e) {
					$data['filename'] = 'mbimages'.'/'.$_FILES['filename']['name'];
				}
			}	  		
			
			$model = Mage::getModel('imageslider/imageslider');		
			$model->setData($data)
				->setId($this->getRequest()->getParam('id'));
			
			try {
				if ($model->getCreatedTime == NULL || $model->getUpdateTime() == NULL) {
					$model->setCreatedTime(now())
						->setUpdateTime(now());
				} else {
					$model->setUpdateTime(now());
				}
				
				//$model->setStores(implode(',',$data['stores']));
				/*if (isset($data['category_ids'])){
					$model->setCategories(implode(',',array_unique(explode(',',$data['category_ids']))));
				}*/
				
				$model->save();
				Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('imageslider')->__('Banner Image was successfully saved'));
				Mage::getSingleton('adminhtml/session')->setFormData(false);

				if ($this->getRequest()->getParam('back')) {
					$this->_redirect('*/*/edit', array('id' => $model->getId()));
					return;
				}
				$this->_redirect('*/*/');
				return;
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
                Mage::getSingleton('adminhtml/session')->setFormData($data);
                $this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
                return;
            }
        }
        Mage::getSingleton('adminhtml/session')->addError(Mage::helper('imageslider')->__('Unable to save Banner Image'));
        $this->_redirect('*/*/');
	}
 
	public function deleteAction() {
		if( $this->getRequest()->getParam('id') > 0 ) {
			try {
				$model = Mage::getModel('imageslider/imageslider');
				 
				$model->setId($this->getRequest()->getParam('id'))
					->delete();
					 
				Mage::getSingleton('adminhtml/session')->addSuccess(Mage::helper('adminhtml')->__('Item was successfully deleted'));
				$this->_redirect('*/*/');
			} catch (Exception $e) {
				Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
				$this->_redirect('*/*/edit', array('id' => $this->getRequest()->getParam('id')));
			}
		}
		$this->_redirect('*/*/');
	}

    public function massDeleteAction() {
        $imagesliderIds = $this->getRequest()->getParam('imageslider');
        if(!is_array($imagesliderIds)) {
			Mage::getSingleton('adminhtml/session')->addError(Mage::helper('adminhtml')->__('Please select item(s)'));
        } else {
            try {
                foreach ($imagesliderIds as $imagesliderId) {
                    $imageslider = Mage::getModel('imageslider/imageslider')->load($imagesliderId);
                    $imageslider->delete();
                }
                Mage::getSingleton('adminhtml/session')->addSuccess(
                    Mage::helper('adminhtml')->__(
                        'Total of %d record(s) were successfully deleted', count($imagesliderIds)
                    )
                );
            } catch (Exception $e) {
                Mage::getSingleton('adminhtml/session')->addError($e->getMessage());
            }
        }
        $this->_redirect('*/*/index');
    }
	
    public function massStatusAction()
    {
        $imagesliderIds = $this->getRequest()->getParam('imageslider');
        if(!is_array($imagesliderIds)) {
            Mage::getSingleton('adminhtml/session')->addError($this->__('Please select item(s)'));
        } else {
            try {
                foreach ($imagesliderIds as $imagesliderId) {
                    $imageslider = Mage::getSingleton('imageslider/imageslider')
                        ->load($imagesliderId)
                        ->setStatus($this->getRequest()->getParam('status'))
                        ->setIsMassupdate(true)
                        ->save();
                }
                $this->_getSession()->addSuccess(
                    $this->__('Total of %d record(s) were successfully updated', count($imagesliderIds))
                );
            } catch (Exception $e) {
                $this->_getSession()->addError($e->getMessage());
            }
        }
        $this->_redirect('*/*/index');
    }
  
    public function exportCsvAction()
    {
        $fileName   = 'imageslider.csv';
        $content    = $this->getLayout()->createBlock('imageslider/adminhtml_imageslider_grid')
            ->getCsv();

        $this->_sendUploadResponse($fileName, $content);
    }

    public function exportXmlAction()
    {
        $fileName   = 'imageslider.xml';
        $content    = $this->getLayout()->createBlock('imageslider/adminhtml_imageslider_grid')
            ->getXml();

        $this->_sendUploadResponse($fileName, $content);
    }

    protected function _sendUploadResponse($fileName, $content, $contentType='application/octet-stream')
    {
        $response = $this->getResponse();
        $response->setHeader('HTTP/1.1 200 OK','');
        $response->setHeader('Pragma', 'public', true);
        $response->setHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0', true);
        $response->setHeader('Content-Disposition', 'attachment; filename='.$fileName);
        $response->setHeader('Last-Modified', date('r'));
        $response->setHeader('Accept-Ranges', 'bytes');
        $response->setHeader('Content-Length', strlen($content));
        $response->setHeader('Content-type', $contentType);
        $response->setBody($content);
        $response->sendResponse();
        die;
    }
}