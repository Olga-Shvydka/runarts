(function ($) {

    //For header
    $(window).scroll(function () {
        var scrollTop = $('body').scrollTop();

        if(scrollTop > 0) {
            if(!$('.header').hasClass('min-header')) {
                $('.header').addClass('min-header');
            }
        } else {
            $('.header').removeClass('min-header');
        }
    });

    //Padding inner wrapper
    var headerHeight= $('.header').height();

    function setWrapperPadding() {
        $('.top-container').css('paddingTop', headerHeight);
    }

    setWrapperPadding();

    $( window ).resize(function() {
        headerHeight= $('.header').height();
        setWrapperPadding();
    });

    //News preview hover
    $.each($('.quote-news') , function() {
        var heightQuote = $(this).height();
        $(this).closest('.desc-news').css('bottom', - (heightQuote - 10));
    });

    //Authentication modal
    $('#btn-login, #e-btn-login').on('click', function() {
        $('#authentication .nav-tabs a[href=#login-form]').attr('aria-expanded', 'true').closest($('li')).addClass('active');
        $('#authentication .nav-tabs a[href=#registration-form]').attr('aria-expanded', 'false');

        $('#login-form').addClass('active');
    });

    $('#btn-registration, #e-btn-registration').on('click', function() {
        $('#authentication .nav-tabs a[href=#registration-form]').attr('aria-expanded', 'true').closest($('li')).addClass('active');
        $('#authentication .nav-tabs a[href=#login-form]').attr('aria-expanded', 'false');

        $('#registration-form').addClass('active');
    });

    $('#authentication').on('hide.bs.modal', function (e) {
        $('#authentication .nav-tabs a').attr('aria-expanded', 'false').closest($('li')).removeClass('active');
        $('.tab-content .tab-pane').removeClass('active');
    });

    //Comments
    $('.comments-form textarea').on('focus', function() {
        $(this).closest('.comments-form').addClass('focus');
    });

    $('.reply').on('click', function(e) {
        var nameUser = $(this).closest('.wrap-comment').find('.user-name').text();
        $(this).closest('.wrap-comment').addClass('comment-reply').find('textarea').val(nameUser +', ').focus();
        e.preventDefault();
    });

    $('.comments-form textarea').blur(function() {
        if($(this).closest('.wrap-comment').hasClass('comment-reply')) {
            $(this).closest('.wrap-comment').removeClass('comment-reply');
        }
    });

    //For button type 'file'
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });

    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {

        var inputTag = $(this).parents('.input-file-group').find('.file'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;

        if( inputTag.length ) {
            inputTag.text(log);
        } else {
            if( log ) alert(log);
        }

    });

    //Button home
    if ( ($(window).height() + 100) < $(document).height() ) {
        $('#top-link').removeClass('hidden').affix({
            offset: {top:100}
        });
    }

    $('.btn-top').on('click', function(e) {
        $('html,body').animate({scrollTop:0},'slow');
        e.preventDefault();
    });

    $('.wrapper' ).scroll(function() {
        console.log($('html,body').scrollTop());

    });

    $( window ).scroll(function() {
        if(($(window).scrollTop() + $('body').height()) == ($(document).height())) {
            $('.wrap-btn-top').addClass('bottom-position');
        } else {
            if(($(window).scrollTop() + $('body').height()) <= ($(document).height()- $('.footer').height())) {
                if($('.wrap-btn-top').hasClass('bottom-position')) {
                    $('.wrap-btn-top').removeClass('bottom-position');
                }
            }
        }
    });

    //Settings profile input
    $('.wrap-input input').on('focus', function() {
        $(this).closest('.form-group').addClass('focus');
    });

    $('.wrap-input input').blur(function() {
        if($(this).closest('.form-group').hasClass('focus')) {
            $(this).closest('.form-group').removeClass('focus');
        }
    });

    //Width scrollbar
    var scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);

    $('.modal').on('show.bs.modal', function (e) {
        $('.header').css('right', scrollbarWidth);
    });
    $('.modal').on('hidden.bs.modal', function (e) {
        $('.header').css('right', 0);
    });

})(jQuery);