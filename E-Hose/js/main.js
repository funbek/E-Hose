var ehose = {


    // checking for integer
    isInteger: function (num) {
        return (num ^ 0) === num;
    },
    // integer && >0
    isIntegerPlus: function (num) {
        return ( ls.isInteger(num) && num > 0 );
    },


    // num control
    numControlCheckForDisabled: function (numControl) {
        var butMinis = numControl.find('.num_minus'),
            inp = numControl.find('input[type=text]');
        if ( inp.val()*1 == 1 ) {
            butMinis.addClass('disabled');
        }
        else if (butMinis.hasClass('disabled')) {
            butMinis.removeClass('disabled');
        }
    },
    setNumControl: function (numControl) {
        numControl.each(function () {
            var $this = $(this),
                butMinis = $this.find('.num_minus'),
                butPlus = $this.find('.num_plus'),
                inp = $this.find('input[type=text]');
            // correcting start values
            if ( inp.val() == '' ) {
                inp.val(1);
            }
            else if ( !ls.isIntegerPlus( inp.val()*1 ) ) {
                inp.val(1);
            }
            ls.numControlCheckForDisabled($this);
            // bind events
            inp.on('change', function () {
                if ( !ls.isIntegerPlus( inp.val()*1 ) ) {
                    inp.val(1);
                }
                ls.numControlCheckForDisabled($this);
            });
            butPlus.on('click', function (e) {
                e.preventDefault();
                inp.val( inp.val()*1+1 );
                ls.numControlCheckForDisabled($this);
            });
            butMinis.on('click', function (e) {
                e.preventDefault();
                var nextValue = inp.val()*1-1;
                if ( nextValue > 0 ) {
                    inp.val( nextValue );
                }
                else {
                    inp.val( 1 );
                }
                ls.numControlCheckForDisabled($this);
            });
        });
    },


    // popup-boxes
    popupBoxClose: function (popup) {
        var popupId = popup.attr('data-popup'),
            overlay = $('.popup_overlay');
        overlay.stop(false, false).animate({'opacity' : 0}, 300);
        popup.stop(false, false).animate({'opacity' : 0}, 300, function () {
            popup.removeAttr('style');
            overlay.remove();
        });
        popup.removeClass("opened");
    },
    popupBoxOpen: function (popup) {
        var popupId = popup.attr('data-popup'),
            overlay = $('<div class="popup_overlay"></div>'),
            theBody = $('body');
        popup.css({'opacity' : 0, 'display' : 'block'});
        overlay.css({'opacity' : 0});
        theBody.append(overlay);

        var ph = popup.height(),
            wh = $(window).height(),
            scr = theBody.scrollTop();
        if ( ph + 140 < wh ) {
            popup.css({'top' : wh/2-ph/2+scr});
        }
        else {
            popup.css({'top' : scr+70});
        }

        overlay.stop(false, false).animate({'opacity' : 1}, 300);
        popup.stop(false, false).animate({'opacity' : 1}, 300, function (e) {
            popup.addClass("opened");
        });
        popup.find('.popup_close').add(overlay).on('click', function () {
            ehose.popupBoxClose(popup);
        });
    },


    hookahPreviewUnset: function (oldPic, a) {
        oldPic.removeClass('hide');
        a.removeClass('current');
        oldPic.next('img').remove();
    },
    hookahPreviewSet: function (oldPic, a) {
        oldPic.addClass('hide');
        a.addClass('current');
        var newPic = $('<img src="'+ a.attr("href")+'" alt="">');
        oldPic.after(newPic);
    },


    recount: function (hookasUl, cartsUl, inp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini) {
        var hookas = 0,
            carts = 0,
            summary = 0,
            names = [],
			hpr = 4490;
			hprMini =3490;
        hookasUl.html('');
        cartsUl.html('');
        hookahList.each(function () {
            var $this = $(this),
                c = $this.data('count');
            if ( c > 0 ) {
                var n = 'Starbuzz E-hose ('+$this.text()+') x '+c;
                hookas = hookas + c;
                hookasUl.append('<li class="clear" data-hid="'+$this.data('hid')+'" data-count="'+c+'"><a href="javascript:void(0)" class="order_delete">удалить</a><div class="order_title">'+n+'</div><div class="order_price"><b>'+hpr*c+'</b> руб.</div></li>');
                summary += hpr*c;
                names.push(n+' - '+hpr*c);
            }
        });
        hookahList_min.each(function () {
            var $this = $(this),
                c = $this.data('count');
            if ( c > 0 ) {
                var n = 'Starbuzz E-hose mini ('+$this.text()+') x '+c;
                hookas = hookas + c;
                hookasUl.append('<li class="clear" data-hid="'+$this.data('hid')+'" data-count="'+c+'"><a href="javascript:void(0)" class="order_delete">удалить</a><div class="order_title">'+n+'</div><div class="order_price"><b>'+hprMini*c+'</b> руб.</div></li>');
                summary += hprMini*c;
                names.push(n+' - '+hprMini*c);
            }
        });
        $('#freecount').text(hookas*2);
        cartsList.each(function () {
            var $this = $(this),
                c = $this.data('count');
            if ( c > 0 ) {
                var price = 590* c,
                    n = $this.find('h4').text()+' x '+c;
					/*
                if ( carts <= 2*hookas ) {
                    var discount = 0;
                    if ( c < 2*hookas-carts ) {
                        discount = c;
                    }
                    else {
                        discount = 2*hookas-carts;
                    }
                    price = (c-discount)*350;
                }
				*/
                carts = carts + c;
                cartsUl.append('<li class="clear" data-cid="'+$this.data('cid')+'" data-count="'+c+'"><a href="javascript:void(0)" class="order_delete">удалить</a><div class="order_title">'+n+'</div><div class="order_price"><b>'+price+'</b> руб.</div>');
                summary += price;
                names.push(n+' - '+price);
            }
        });

        cartsList_mini.each(function () {
            var $this = $(this),
                c = $this.data('count');
            if ( c > 0 ) {
                var price = 3490* c,
                    n = $this.find('h4').text()+' x '+c;
                    /*
                if ( carts <= 2*hookas ) {
                    var discount = 0;
                    if ( c < 2*hookas-carts ) {
                        discount = c;
                    }
                    else {
                        discount = 2*hookas-carts;
                    }
                    price = (c-discount)*350;
                }
                */
                carts = carts + c;
                cartsUl.append('<li class="clear" data-cid="'+$this.data('cid')+'" data-count="'+c+'"><a href="javascript:void(0)" class="order_delete">удалить</a><div class="order_title">'+n+'</div><div class="order_price"><b>'+price+'</b> руб.</div>');
                summary += price;
                names.push(n+' - '+price);
            }
        });
        summaryInp.val(summary);
        summaryText.text(summary);
        inp.val(names.toString().replace(/\s+/g," "));
    }


};


$(function() {


    var oldPic = $('.hookah_image img'),
        hookahPreviews = $('.hookah_previews a');
    hookahPreviews.on('mouseenter', function (e) {
        e.preventDefault();
        var $this = $(this),
            cur = $('.hookah_previews a.current');
        if ( cur.length ) {
            ehose.hookahPreviewUnset(oldPic, cur);
        }
        ehose.hookahPreviewSet(oldPic, $this);
    });
    $('.hookah_previews').on('mouseleave', function (e) {
        var cur = $('.hookah_previews a.current');
        if ( cur.length ) {
            ehose.hookahPreviewUnset(oldPic, cur);
        }
    });
	
    hookahPreviews.on('click', function (e) {
        e.preventDefault();
		/*
        var $this = $(this),
            cur = $('.hookah_previews a.current'),
            isCurrent = false;
        if ( $this.hasClass('current') ) {
            isCurrent = true;
        }
        if ( cur.length ) {
            ehose.hookahPreviewUnset(oldPic, cur);
        }
        if ( !isCurrent ) {
            ehose.hookahPreviewSet(oldPic, $this);
        }
		*/
    });


    var colorpick_li = $('.color_pick ul li'),
        colorpick_hr = $('a', colorpick_li),
        hview = $('.hookah_choose .hookah_view'),
		hviewMin = $('.hookah_view_mini');
    colorpick_hr.on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            hid = $(this).parent().data('hid'),
			cid = $(this).parent().data('cid'),
			color = $(this).data('color'),
            img = $('<img class="hookah-preview" src="'+$this.attr("href")+'" alt="Электронный кальян Starbuzz E-hose ('+$this.text()+')" />');
			img2 = $('<img class="hookah-preview" src="images/ehose-mini-'+color+'.jpg" alt="Электронный кальян Starbuzz E-hose mini ('+$this.text()+')" />');
        colorpick_hr.removeClass('current');
        colorpick_li.filter('[data-hid="'+hid+'"]').find('a').addClass('current');
		colorpick_li.filter('[data-hid="'+cid+'"]').find('a').addClass('current');
		//hview.find('img').fadeOut(300);		
		//hviewMin.find('img').fadeOut(300);
         $('img.hookah-preview').fadeOut(0).promise().done(function() {
		$('img.hookah-preview').remove();	
		hview.append(img);       
        hviewMin.append(img2);
		$('img.hookah-preview').fadeIn(100);	
		});
    });


    $('.cartridges .item').on('mouseenter', function (e) {
        $(this).addClass('invert');
    });
    $('.cartridges .item').on('mouseleave', function (e) {
        $(this).removeClass('invert');
    });


    var hookasUl = $('#ul_hookas'),
        cartsUl = $('#ul_cartridges'),
        prodInp = $('#products'),
        summaryInp = $('#summary'),
        summaryText = $('#summary_text'),
        hookahList = $('li', '#hookah_list'),
        hookahList_min = $('li', '#hookah_list_min'),
        cartsList = $('.item', '#carts_list'),
        cartsList_mini = $('.mini-ehose', '#carts_list');
    ehose.recount(hookasUl, cartsUl, prodInp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini);

    $('.hookah_add').on('click', function (e) {
        e.preventDefault();
		
		var cur = {};
		
		if (this.id == 'hookah_add') { 
			cur = $('#hookah_list .current').parent()
		} else {
			cur = $('#hookah_list_min .current').parent()
		}
		
        var c = cur.data('count');
        if ( c > 0 ) {
            c++;
        }
        else {
            c = 1;
        }
        cur.data('count', c);
        ehose.recount(hookasUl, cartsUl, prodInp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini);
    });
	
	$('.button_grey.choise-your').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
			cid = $this.data('cid');
            cur = $('.order_cartridge .item').filter('[data-cid="'+cid+'"]');
            c = cur.data('count');
        if ( c > 0 ) {
            c++;
        }
        else {
            c = 1;
        }
        cur.data('count', c);
        ehose.recount(hookasUl, cartsUl, prodInp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini);
    });
    

    $('.order_cartridge .item .cartridge_add').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            cur = $this.closest('.item'),
            c = cur.data('count');
        if ( c > 0 ) {
            c++;
        }
        else {
            c = 1;
        }
        cur.data('count', c);
        ehose.recount(hookasUl, cartsUl, prodInp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini);
    });


    $('.order_cartridge .mini-ehose .cartridge_add').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            cur = $this.closest('.mini-ehose'),
            c = cur.data('count');
        if ( c > 0 ) {
            c++;
        }
        else {
            c = 1;
        }
        cur.data('count', c);
        ehose.recount(hookasUl, cartsUl, prodInp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini);
    });


    hookasUl.on('click', '.order_delete', function (e) {
        e.preventDefault();
        var li = $(this).closest('li'),
            hid = li.data('hid'),
            c = li.data('count'),
            h = hookahList.filter('[data-hid="'+hid+'"]');
			if (h.length < 1 ) {
				h = hookahList_min.filter('[data-hid="'+hid+'"]');
			}
        h.data('count', c-1);
        ehose.recount(hookasUl, cartsUl, prodInp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini);
    });

    cartsUl.on('click', '.order_delete', function (e) {
        e.preventDefault();
        var li = $(this).closest('li'),
            hid = li.data('cid'),
            c = li.data('count'),
            h = cartsList.filter('[data-cid="'+hid+'"]');
        console.log(h.html());
        h.data('count', c-1);
        ehose.recount(hookasUl, cartsUl, prodInp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini);
    });

    cartsUl.on('click', '.order_delete', function (e) {
        e.preventDefault();
        var li = $(this).closest('li'),
            hid = li.data('cid'),
            c = li.data('count'),
            h = cartsList_mini.filter('[data-cid="'+hid+'"]');
        console.log(h.html());
        h.data('count', c-1);
        ehose.recount(hookasUl, cartsUl, prodInp, summaryInp, summaryText, hookahList, hookahList_min, cartsList, cartsList_mini);
    });


    $('a[data-popup]').on('click', function (e) {
        e.preventDefault();
        var $this = $(this),
            popup = $('div.popup[data-popup="'+$this.data('popup')+'"]');
        ehose.popupBoxOpen(popup);
    });
	
	
	$('.mailsender').on('submit', function(e) {
		e.preventDefault();
		var form = $(this);
		
		$.ajax({
			type: "POST",
			url: "mailer.php",
			data: form.serialize(),
			success: function(data){
				form.html(data);
                $(".popup.popup_cart.clear.opened,.popup.popup_opt.clear.opened").text("Спасибо, что заполнили форму, наши операторы перезвонят Вам!");
				var openedPopup = $('.popup.opened');
				if ( openedPopup.length ) {
					var scr = openedPopup.offset().top,
						diff = $(window).height() - openedPopup.height();
					if ( diff > 0 ) {
						$('body').animate({scrollTop : scr - diff/2}, 600);
					}
					else {
						$('body').animate({scrollTop : scr - 70}, 600);
					}
				}
			}
		});
	});
	
});


$(document).ready(function(){
    // плавная прокрутка
    $('a[href^="#"]').bind('click.smoothscroll',function (e) {
         e.preventDefault();
         
        var target = this.hash,
         $target = $(target);
         
        $('html, body').stop().animate({
             'scrollTop': $target.offset().top
             }, 500, 'swing', function () {
             window.location.hash = target;
         });
     });
})