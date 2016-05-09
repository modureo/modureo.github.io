var nowPage = "";
var nowPageOn = "";
var scrollDownEvent = $.Event('mousewheel',{deltaY:-1});
var scrollUpEvent = $.Event('mousewheel',{deltaY:1});
var transitionEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend';
var animationEnd = 'animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd';
var resultView = "";
var nextPageView = "";
$(document).ready(function(){
	scrollPage ();
	lastSectionMove();
	pageOn.ButtonClick();
	scrollButton.Up();
	scrollButton.Down();
	subPageShow();
	gnbToggle ();
	Page08Tab ();
	videoPlay ();

});


function scrollPage () {
	var numberOneTime = true;
	$(".ScrollPage").on('mousewheel',function  (e) {
		nowPage = $(this);
		if (nowPage.offset().top == 0) {
			if ($(this).hasClass('FirstPage')) {
				if (e.deltaY>0) {
					$(this).find('.NowContent').stop().fadeIn().next().stop().fadeOut().parent().removeClass('BackgroundTransparent');
					$(this).find('.BlackScale').stop().fadeOut();
					$(this).find('.BorderWrap').find('.SalieMovieButton').stop().fadeIn();
				}else {
					$(this).find('.BorderWrap').find('.SalieMovieButton').stop().fadeOut();
					$(this).find('.BorderWrap').addClass('BackgroundTransparent').find('.NowContent').stop().fadeOut().next().stop().fadeIn(function  () {
						nowPage.one('mousewheel',function  (e) {
							if (e.deltaY<0) {
								pageMove.scrollDown();
								$(".MainScrollButton").removeClass('ShowButton').addClass('HideButton');
								$(".NextScrollButton").removeClass('HideButton').addClass('ShowButton');
							}
						});
					});
					$(this).find('.BlackScale').stop().fadeIn();
				}
			}else if ($(this).index() == 0) {
				if (e.deltaY<0) {
					pageMove.scrollDown();
					$(".MainScrollButton").removeClass('ShowButton').addClass('HideButton');
					$(".NextScrollButton").removeClass('HideButton').addClass('ShowButton');
				}

			}else if ($(this).index() == 1) {
				if (e.deltaY>0) {
					pageMove.scrollUp();			
					$(".MainScrollButton").removeClass('HideButton').addClass('ShowButton');
					$(".NextScrollButton").removeClass('ShowButton').addClass('HideButton');
				}else {
					pageMove.scrollDown();
				}
			}else if (nowPage.hasClass('HorizontalScroll')) {
				if ($(this).children().eq(0).offset().left == 30) {
					if (e.deltaY>0) {
						$(".HorizontalScroll").removeClass('On').addClass('NextPage').prev().removeClass('PrevPage').addClass('On');
						$(".HorizontalScroll").prev().find('.BorderWrap').removeClass('MoveTop').addClass('MovePlace');
						pageOn.Up();
					}else {
						$('.HorizontalScroll').children('.StepView').removeClass('StepView').addClass('PrevStep').next().removeClass('NextStep').addClass('StepView').one(transitionEnd,function  () {
							if ($(this).hasClass('StepView')) {
								$(".ImgAnimationArea").children('.ShowImg').css({opacity:1});
							}	
						});
					}
				}else if ($(this).children().eq(1).offset().left == 30) {
					if (e.deltaY>0) {
						$(".ImgAnimationArea").children('.ShowImg').css({opacity:0});
						$(".WaveAnimation").children().removeClass('On');
						$(".TextArea").stop().fadeOut(400);
						$(".ImgAnimationArea").children('.MoveSalie').children().removeClass('MoveImgHide');
						if ($('.HorizontalScroll').children().eq(1).hasClass('StepView')) {
							horizonScroll.Up();
						}
						$('.TextArea03,.ResultText').stop().fadeOut();
						horizonHideImg.hide01();
					}else {
						$(".ImgAnimationArea").children('.MoveSalie').children().addClass('MoveImgHide').on(animationEnd,function  () {
							if ($(".HorizontalScroll").children().eq(1).hasClass('StepView')) {
								$(".WaveAnimation").children().addClass('On');
								$(".TextArea").stop().fadeIn(800);
								$(".HorizontalScroll").one('mousewheel',function  (e) {
									if (e.deltaY<0 ) {
										$(".HorizontalScroll").children().eq(1).removeClass('StepView').addClass('PrevStep').next().removeClass('NextStep').addClass('StepView').on(transitionEnd,function  () {
											if ($(".HorizontalScroll").children().eq(2).hasClass('StepView')) {
												$(".MoveSalie").css({marginTop:'-1000px',marginLeft:'-75px'});
												$(".MovePhone").css({marginTop:'-1500px',marginLeft:'-75px'});
											}
										});
										$(".WaveAnimation").children().removeClass('On');
										$(".TextArea").stop().fadeOut(400);
									}
								});
							}
						});
					}
				}else if ($(this).children().eq(2).offset().left == 30) {
					if (e.deltaY>0) {
						$(".MovePhone").css({marginTop:'-267px',marginLeft:'-128px'}).one(transitionEnd,function  () {
							$(".TextArea").stop().fadeIn(400);
						});
						$(".MoveSalie").css({marginTop:'210px',marginLeft:'-85px'});
						$(".ImgAnimationArea").children('.Water').removeClass('On');
						$(".TextArea02").stop().fadeOut();
						horizonScroll.Up();
					}else {
						$(".ImgAnimationArea").children('.Water').addClass('On').on(transitionEnd,function  () {
							if ($(".HorizontalScroll").children().eq(2).hasClass('StepView')) {
								$(".MoveSalie").css({marginTop:'-700px'}).on(transitionEnd,function  () {
									if ($(".HorizontalScroll").children().eq(2).hasClass('StepView') && $(".Water").hasClass('On')) {
										$(".TextArea02").stop().fadeIn(function  () {
											$(".HorizontalScroll").one('mousewheel',function  (e) {
												if (e.deltaY<0 && $(".HorizontalScroll").children().eq(2).hasClass('StepView') ) {
													$(".HorizontalScroll").children().eq(2).removeClass('StepView').addClass('PrevStep').next().removeClass('NextStep').addClass('StepView').one(transitionEnd,function  () {
														if ($(".HorizontalScroll").children().eq(3).hasClass('StepView')) {
															$(".MovePhone").css({marginTop:'-267px',marginLeft:'-128px'}).one(transitionEnd,function  () {
																$(".TextArea03").stop().fadeIn(600);
															});
															$(".MoveSalie").css({marginTop:'210px',marginLeft:'-85px'});
															$(".ImgAnimationArea").children('.Water').removeClass('On');
														}
													});
													$(".WaveAnimation").children().removeClass('On');

													$(".TextArea02").stop().fadeOut();
												}
											});
										});
									}
								});
								$(".WaveAnimation").children().addClass('On');
							}
						});
						resultView = true;
						nextPageView = false;
						numberOneTime = true;
						nextMove = false;
					}
				}else if ($(this).children().eq(3).offset().left == 30) {
					if (e.deltaY>0) {
						$('.ResultText,.SalieMeasure,.TextArea03').stop().fadeOut();
						$('.MoveAppBox').removeClass('On'); 
						$(".WaveAnimation").css({marginTop:0,marginLeft:0}).children().removeClass('On');
						horizonHideImg.hide03();
						horizonScroll.Up();
					}else {
						$(".WaveAnimation").css({marginTop:-250,marginLeft:35}).children().addClass('On');
						if(resultView){
							$(".SalieMeasure").stop().fadeIn(function  () {
								var NumberPlus = $(".Number");
								var NumberPlusSub = $(".NumberSub");
								if (numberOneTime) {
									$({ val : 0 }).stop().animate({ val : 25 }, {
									  duration: 400,
									  step: function() {
										 NumberPlus.text(Math.floor(this.val));
									  },
									  complete: function() {
										 NumberPlus.text(Math.floor(this.val));
									  }
									});
									
									$({ val : 50 }).stop().animate({ val : 0 }, {
									  duration: 400,
									  step: function() {
										 NumberPlusSub.text(Math.floor(this.val));
									  },
									  complete: function() {
										 NumberPlusSub.text(Math.floor(this.val));
									  }
									});
									numberOneTime = false;
									
								}

								$(".HorizontalScroll").one('mousewheel',function  (evt) {
									if (evt.deltaY<0 && $(this).children().eq(3).hasClass('StepView') ) {
										$(".ImgAnimationArea").children('p,.SalieMeasure').stop().fadeOut(function(){
											$('.MoveAppBox').addClass('On'); 
											$('.ResultText').stop().fadeIn();
											$(".HorizontalScroll").one('mousewheel',function  (e) {
												if (e.deltaY<0 && $(this).children().eq(3).hasClass('StepView') ) {
													$(".HorizontalScroll").removeClass('On').addClass('PrevPage').next().removeClass('NextPage').addClass('On');		
													$(this).find('.BorderWrap').removeClass('MovePlace').addClass('MoveTop');
													pageOn.Down();
													numberOneTime = true;
													resultView = false;
													nextPageView = true;
													//$('.ResultImg,.ResultText').stop().fadeOut();

												}
											});

										});
									}
								});	
							});
							
						}
						if(nextPageView){
							pageOn.Down();
						}
					}
				}
			}else if (nowPage.hasClass('LastSection')) {
				if (e.deltaY>0) {
					pageMove.scrollUp();
				}else{
					$($(this)).addClass('LastSectionMove');
					$(".NextScrollButton.ScrollDownButton").removeClass('ShowButton').addClass('HideButton');
				}
			}else {
				if (e.deltaY>0) {
					pageMove.scrollUp();				
				}else {
					pageMove.scrollDown();				
				}
			}
		}
	});
};

var pageMove = {
	scrollUp : function  () {
		if (nowPage.prev().hasClass('PrevPage') ) {
			if (nowPage.hasClass('SubLastSection')) {
				$(".NextScrollButton.ScrollDownButton").addClass('ShowButton').removeClass('HideButton');
				nowPage.removeClass('On').addClass('NextPage').prev().removeClass('PrevPage').addClass('On');
				nowPage.prev().find('.BorderWrap').removeClass('MoveTop').addClass('MovePlace');
				pageOn.Up();
			}else {
				nowPage.removeClass('On').addClass('NextPage').prev().removeClass('PrevPage').addClass('On');
				nowPage.prev().find('.BorderWrap').removeClass('MoveTop').addClass('MovePlace');
				pageOn.Up();
			}
		}
	},
	scrollDown :function  () {
		if (nowPage.next().hasClass('NextPage')) {
			if (nowPage.next().hasClass('SubLastSection')) {
				nowPage.removeClass('On').addClass('PrevPage').next().removeClass('NextPage').addClass('On');
				$(".NextScrollButton.ScrollDownButton").removeClass('ShowButton').addClass('HideButton');
				pageOn.Down();
			}else {
				nowPage.removeClass('On').addClass('PrevPage').next().removeClass('NextPage').addClass('On');
				nowPage.find('.BorderWrap').removeClass('MovePlace').addClass('MoveTop');
				pageOn.Down();
			}
		}
	}
};

var pageOn = {
	Up : function  () {
		var OnIndex = nowPage.index();
		$(".PageControl.DotButton").children().eq(OnIndex).prev().addClass('On').siblings().removeClass('On');
	},
	Down : function  () {
		var OnIndex = nowPage.index();
		$(".PageControl.DotButton").children().eq(OnIndex).next().addClass('On').siblings().removeClass('On');
	},
	ButtonClick : function  () {
		var pageButton = $(".PageControl").children().children('a');
		pageButton.on('click',function  () {
			//$(".ScrollPage").find('.BorderWrap').removeClass('MovePlace').addClass('MoveTop');
			$(this).parent().addClass('On').siblings().removeClass('On');
			var nowOnButtonIndex = $(".ScrollPage.On").index();
			var onButtonIndex = $(this).parent().index();
			var moveOn = -(nowOnButtonIndex-onButtonIndex);
			//console.log('�꾩옱�꾩튂',nowOnButtonIndex,"�대┃",onButtonIndex,moveOn);
			if (nowOnButtonIndex<onButtonIndex) {
				$(".ScrollPage").eq(onButtonIndex).removeClass('NextPage').addClass('On').prevAll().removeClass('On').removeClass('NextPage').addClass('PrevPage');
				$(".ScrollPage").eq(onButtonIndex).find('.BorderWrap').removeClass('MoveTop').addClass('MovePlace');
			}else if (nowOnButtonIndex>onButtonIndex) {
				$(".ScrollPage").eq(onButtonIndex).removeClass('PrevPage').addClass('On').nextAll().removeClass('On').removeClass('PrevPage').addClass('NextPage').find('.BorderWrap').removeClass('MoveTop').addClass('MovePlace');;
				$(".ScrollPage").eq(onButtonIndex).find('.BorderWrap').removeClass('MoveTop').addClass('MovePlace');
			}
			if (onButtonIndex == 0) {
				$(".MainScrollButton").removeClass('HideButton').addClass('ShowButton');
				$(".NextScrollButton").removeClass('ShowButton').addClass('HideButton');
			}else {
				$(".MainScrollButton").removeClass('ShowButton').addClass('HideButton');
				$(".NextScrollButton").removeClass('HideButton').addClass('ShowButton');
			}
			if ($(".LastSection").hasClass('LastSectionMove')) {
				$(".LastSection").removeClass('LastSectionMove');
			}
			return false;
		});
	}
};
function lastSectionMove() {
	$(".LastSection").on('mousewheel',function  (e) {
		if ($('.LastSection').hasClass('LastSectionMove')) {
			if (e.deltaY>0) {
				$('.LastSection').removeClass('LastSectionMove');
				$(".NextScrollButton.ScrollDownButton").removeClass('HideButton').addClass('ShowButton');
			}
		}
	});
};
var scrollButton = {
	Up : function  () {
		$(".ScrollDownButton").on('click',function  () {
			var scrll = jQuery.Event('mousewheel',{deltaY:-1});
			if ($(".ScrollPage.On").hasClass('HorizontalScroll') ) {
				$(".StepView").trigger(scrll);
			}else {
				$(".ScrollPage.On").trigger(scrll);
			}
		})
	},
	Down : function  () {
		$(".ScrollUpButton").on('click',function  () {
			var scrll = jQuery.Event('mousewheel',{deltaY:1});
			if ($(".ScrollPage.On").hasClass('HorizontalScroll') ) {
				$(".StepView").trigger(scrll);
			}else {
				$(".ScrollPage.On").trigger(scrll);
			}
		});
	}
};
var scrollButtonPageMove = {
	scrollUp : function  () {
		nowPageOn.removeClass('On').addClass('NextPage').prev().removeClass('PrevPage').addClass('On');
		nowPageOn.prev().find('.BorderWrap').removeClass('MoveTop').addClass('MovePlace');
		scrollButtonPageOn.Up();
	},
	scrollDown :function  () {
		nowPageOn.removeClass('On').addClass('PrevPage').next().removeClass('NextPage').addClass('On');
		nowPageOn.find('.BorderWrap').removeClass('MovePlace').addClass('MoveTop');
		scrollButtonPageOn.Down();
	}
};
var scrollButtonPageOn = {
	Up : function  () {
		var OnIndex = nowPageOn.index();
		$(".PageControl").children().eq(OnIndex).prev().addClass('On').siblings().removeClass('On');
	},
	Down : function  () {
		var OnIndex = nowPageOn.index();
		$(".PageControl").children().eq(OnIndex).next().addClass('On').siblings().removeClass('On');
	}
};
function subPageShow () {
	$(".SubPageOpen").on('click',function  () {
		var attrHref = $(this).attr('href');
		var subPageWrap = $(".SubPageWrap");
		subPageWrap.addClass('On');
		subPageWrap.children('.SubPage').attr('src','/Salie/'+attrHref);
		return false;
	});
	$(".CloseBtn").on('click',function  () {
		$(".SubPageWrap").removeClass('On');
	});
};
function gnbToggle () {
	$(".NavMenuButton").on('click',function  () {
		$(".GNB").addClass('On');
		$(".MainCover").fadeIn();
	});
	$(".MainCover").on('click',function  () {
		$(this).fadeOut();
		$(".GNB").removeClass('On');
	});
	$('.MenuCloseButton,.SidebarLogo').on('click',function () {
		$('.MainCover').fadeOut();
		$(".GNB").removeClass('On');
	});
};
function HoverTextChange () {
	var ChangeButton = $(".ImgMap").find('ul').children('li').children('a');
	ChangeButton.on('mouseenter',function  () {
		$(this).addClass('On').parent().siblings().children().removeClass('On');
		var thisListIndex = $(this).parent().index();
		$(".FirstText").find('.Hide').fadeOut().parent().find('.Show').fadeIn();
		$(".HoverShowList").each(function  () {
			$(this).children().eq(thisListIndex).stop().fadeIn().siblings().stop().fadeOut();;
		});
	});
};
var horizonScroll = {
	Up : function  () {
		$('.HorizontalScroll').children('.StepView').removeClass('StepView').addClass('NextStep').prev().removeClass('PrevStep').addClass('StepView');
	},Down : function () {
		$('.HorizontalScroll').children('.StepView').removeClass('StepView').addClass('PrevStep').next().removeClass('NextStep').addClass('StepView');
	}
};

function Page08Tab () {
	$(".TabButton").children().on('click',function  () {
		var tabIndex = $(this).index();
		$(this).addClass('On').siblings().removeClass('On');
		$(".TabContent").each(function  () {
			$(this).children().eq(tabIndex).stop().fadeIn().siblings().stop().fadeOut();
		})
	});
	$(".TabContent").children('ul').children('li').on('click',function  () {
		var Question = $(this).text();
		console.log(Question);
		var liIndex = $(this).index();
		var ulIndex = $(this).parent().index();
		$(".TabContent").children('dl').eq(ulIndex).children('dt').text(Question);
		$(".TabContent").children('dl').eq(ulIndex).children('dd').eq(liIndex).addClass('On').siblings().removeClass('On');

	})

};
function videoPlay () {
	$(".MovieButton").on('click',function  () {
		var videoSrc = 'https://www.youtube.com/embed/JPqxFzsbajg?autoplay=1&rel=0&showinfo=0'
		$(".MovieFrame").prop('src',videoSrc)
		$(".VideoArea").fadeIn();
		return false;
	});
	$(".VideoArea").children('.BlackCover').on('click',function  () {
		$(this).parent().hide();
		$(".MovieFrame").prop('src','')
	})

};
var  horizonHideImg = {
	hide01 : function  () {
		$(".HorizontalScroll").children().eq(0).one(transitionEnd,function  () {
			$('.TextArea03,.ResultText').stop().fadeOut();
			$(".ImgAnimationArea").children('.ShowImg').css({opacity:0});
			$(".WaveAnimation").children().removeClass('On');
			$(".TextArea").stop().fadeOut(400);
			$(".ImgAnimationArea").children('.MoveSalie').children().removeClass('MoveImgHide');
		});
	},hide03 : function  () {
		$(".HorizontalScroll").children().eq(3).one(transitionEnd,function  () {
			$('.TextArea03,.ResultText').stop().fadeOut();
		});
	}
};