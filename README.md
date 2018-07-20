# @gurinder/vue-wysiwyg-tinymce

### Usage

```html
<vue-wysiwyg
    placeholder="Write something great..."
    file-upload-url="http://upload-file.com"
    v-model="content"></vue-wysiwyg>
```

JS
``` js
import VueWysiwyg from '@gurinder/vue-wysiwyg-tinymce';
Vue.component('vue-wysiwyg', VueWysiWyg)


// Copy tinymce css and themes files to your public folder from node modules
'tinymce/themes' => '/js/tinymce/themes'
'tinymce/skins/lightgray' => '/js/tinymce/skins'
'tinymce/skins/' => '/js/tinymce/skins'
'tinymce/plugins/codesample' => '/chunks/plugins/codesample'
'tinymce/plugins/codesample/css/prism.css' => '/js/plugins/codesample/css/prism.css'

```