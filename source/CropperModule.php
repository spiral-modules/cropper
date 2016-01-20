<?php
/**
 * Spiral Framework.
 *
 * @license   MIT
 * @author    Anton Titov (Wolfy-J)
 */
namespace Spiral;

use Spiral\Core\DirectoriesInterface;
use Spiral\Modules\ModuleInterface;
use Spiral\Modules\PublisherInterface;
use Spiral\Modules\RegistratorInterface;

class CropperModule implements ModuleInterface
{
    /**
     * {@inheritdoc}
     */
    public function register(RegistratorInterface $registrator)
    {
        /**
         * Let's register new view namespace 'cropper'.
         */
        $registrator->configure('views', 'namespaces.spiral', 'spiral/cropper', [
            "directory('libraries') . 'spiral/cropper/source/views/',",
        ]);

    }

    /**
     * {@inheritdoc}
     */
    public function publish(PublisherInterface $publisher, DirectoriesInterface $directories)
    {
        /**
         * Publishing all module visual resources. We are going to overwrite existed files.
         */
        $publisher->publishDirectory(
            __DIR__ . '/../resources',                        //js, css
            $directories->directory('public') . 'resources',  //Expected directory in webroot
            PublisherInterface::OVERWRITE                     //We can safely overwrite resources
        );
    }
}