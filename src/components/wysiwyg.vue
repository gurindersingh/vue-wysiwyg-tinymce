<template>
    <div class="wysiwyg-editor" :class="{'active-editor' : editorActive}">
        <h3 class="label" v-if="label" v-text='label'>Label</h3>
        <textarea :id="id" class="form-control" :ref="id"></textarea>

        <input type="file" ref="imageInput" @change="insertMediaIntoEditor" style="display: none">
    </div>
</template>

<script>
    // // Import TinyMCE
    import tinymce from 'tinymce/tinymce';
    // A theme is also required
    import 'tinymce/themes/modern/theme';
    // Any plugins you want to use has to be imported
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/wordcount';
    import 'tinymce/plugins/autolink';
    import 'tinymce/plugins/autosave';
    import 'tinymce/plugins/charmap';
    import 'tinymce/plugins/codesample';
    import 'tinymce/plugins/contextmenu';
    import 'tinymce/plugins/emoticons';
    import 'tinymce/plugins/fullscreen';
    import 'tinymce/plugins/hr';
    import 'tinymce/plugins/imagetools';
    import 'tinymce/plugins/insertdatetime';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/media';
    import 'tinymce/plugins/noneditable';
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/print';
    import 'tinymce/plugins/searchreplace';
    import 'tinymce/plugins/tabfocus';
    import 'tinymce/plugins/template';
    import 'tinymce/plugins/textpattern';
    import 'tinymce/plugins/visualblocks';
    import 'tinymce/plugins/anchor';
    import 'tinymce/plugins/autoresize';
    import 'tinymce/plugins/bbcode';
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/colorpicker';
    import 'tinymce/plugins/directionality';
    import 'tinymce/plugins/fullpage';
    import 'tinymce/plugins/help';
    import 'tinymce/plugins/image';
    import 'tinymce/plugins/importcss';
    import 'tinymce/plugins/legacyoutput';
    import 'tinymce/plugins/lists';
    import 'tinymce/plugins/nonbreaking';
    import 'tinymce/plugins/pagebreak';
    import 'tinymce/plugins/preview';
    import 'tinymce/plugins/save';
    import 'tinymce/plugins/spellchecker';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/textcolor';
    import 'tinymce/plugins/toc';
    import 'tinymce/plugins/visualchars';

    import defaultOptions from './defaultOptions.js';

    export default {
        name: "vue-wysiwyg",

        props: {
            dataOptions: {
                type: Object,
                default: () => {
                }
            },
            label: {
                type: String
            },
            value: {
                type: String,
                default: ''
            },
            fileUploadUrl: {
                value: String,
                require: true
            }
        },

        data() {
            return {
                id: 'vue-tinymce-' + Date.now(),
                options: {},
                editor: null,
                isTyping: false,
                editorActive: false,
                processing: false,
                mdiStyleSheets: [
                    'https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/2.5.94/css/materialdesignicons.min.css'
                ]
            }
        },

        created() {

        },

        mounted() {
            // https://reformatcode.com/code/php/tinymce-quotcodesamplequot-plugin-executes-html-tag
            this.addMaterialDesignStyleSheet();

            if (!window.tinymce) {
                return console.warn("TinyMCE not available")
            }
        

            this.init();
        },

        beforeDestroy() {
            this.editor.destroy();
        },

        methods: {
            init() {
                let vm = this;

                this.options = Object.assign(defaultOptions, this.dataOptions, {
                    selector: 'textarea#' + this.id,
                   init_instance_callback: editor => {
                        this.editor = editor;
                        this.editor.on('focus', e => vm.editorActive = true);
                        this.editor.on('blur', e => vm.editorActive = false);
                    },

                    setup: editor => {
                        editor.addButton('uploadImage', {
                            icon: " mdi mdi-upload",
                            title: "Upload media",
                            onclick: editor => this.triggerImageUpload()
                        });
                        editor.on('init', () => {
                            if (this.value != null) {
                                editor.setContent(this.value)
                            }
                            editor.on('input change undo redo execCommand KeyUp', () => {
                                this.$emit('input', editor.getContent());
                            });

                        });
                    } 
                });

                this.editor = tinymce.init(this.options)
            },

            triggerImageUpload() {
                this.$refs.imageInput.click();
            },

            insertMediaIntoEditor(event) {
                this.processing = true;
                let file = event.target.files[0];

                let data = new FormData();
                data.append('file', file);

                window.axios.post(this.fileUploadUrl, data)
                    .then(res => {
                        this.$refs.imageInput.value = '';
                        this.addMediaToHtml(res.data.media, res.data.url);
                    })
                    .catch(err => {
                        this.processing = false;
                        this.$refs.imageInput.value = '';
                        console.log(err);
                    })
            },

            addMediaToHtml(media, url) {

                if (media.file_type === 'image') {
                    let img = `<img src='${url}' data-media-name="${media.name}" style="max-width: 100%; height: auto"/>`;
                    this.editor.insertContent(img);
                }

                if (media.file_type === 'video') {
                    
                }

                this.processing = false;
            },

            addMaterialDesignStyleSheet() {

                let id = (Math.random() * 1e32).toString(36);

                this.mdiStyleSheets.forEach(link => {
                    let ss = document.createElement("link");
                    ss.type = "text/css";
                    ss.rel = "stylesheet";
                    ss.href = `${link}?id=${id}`;
                    document.getElementsByTagName("head")[0].appendChild(ss);
                });

            }

        }
    }
</script>