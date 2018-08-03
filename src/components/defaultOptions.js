export default {
    inline: false,
    theme: "modern",
    menubar: false,
    skin_url: '/js/tinymce/skins/lightgray',
    theme_url: '/js/tinymce/themes',
    plugins: "advlist autolink autoresize lists link image charmap print preview hr anchor " +
    "searchreplace wordcount visualblocks visualchars code fullscreen " +
    "insertdatetime media nonbreaking table contextmenu directionality template " +
    "paste textcolor colorpicker toc help emoticons hr",
    toolbar1: "formatselect | bold italic link underline strikethrough  forecolor backcolor | numlist bullist outdent indent | alignleft aligncenter alignright alignjustify | removeformat",
    toolbar2: "image uploadImage media table hr insertdatetime preview | print | fullscreen",
    fontsize_formats: "8px 10px 12px 14px 16px 18px 20px 22px 24px 26px 28px 30px 34px 38px 42px 48px 54px 60px",
    content_css: [
        '//fonts.googleapis.com/css?family=Fira+Mono|Lato',
    ],
    content_style: 'img {max-width: 100%;}',
    image_dimensions: false,
    insertdatetime_formats: ["%D", "%r", "%b-%d-%Y", "%b-%d-%Y@%I:%M %p"],
    branding: false,
    autoresize_min_height: 350,
    min_height: 350,
    convert_urls: false,
}