<?php
/*
Template Name: Отзывы
*/
?>

<?php get_header(); ?>

<!-- reviews page -->
<section id="reviews__page" class="bg_color">
	<div class="conteiner m-auto">
		<div class="head">
			<h2 class="m-auto">
				ОТЗЫВЫ О КОМПАНИИ «Викинг строй»
			</h2>
		</div>
		<div class="reviews__page-content">
			<div class="reviews__items">
				<?php
				define('DEFAULT_COMMENTS_PER_PAGE', 2);
				$page           = $_GET['com'] ? $_GET['com'] : 1;
				$limit          = DEFAULT_COMMENTS_PER_PAGE;
				$offset         = ($page * $limit) - $limit;
				$total_comments = get_comments(array('status' => 'approve'));
				$pages          = ceil(count($total_comments) / DEFAULT_COMMENTS_PER_PAGE);

				$comments = get_comments([
					'post_id' => 13,
					'status'  => 'approve',
					'offset'  => $offset,
					'number'  => $limit,
				]);
				if ($comments) :
					foreach ($comments as $comment) : ?>
						<div class="reviews__item">
							<div class="reviews__img">
								<img src="<?php
											$src_img = wp_get_attachment_image_src(get_comment_meta($comment->comment_ID, 'attachment_id', true));
											echo $src_img[0]; ?>" alt=" ОТЗЫВЫ О КОМПАНИИ «Викинг строй»">
							</div>
							<div class="review__content">
								<div class="review__head">
									<p><?php echo $comment->comment_author; ?></p>
								</div>
								<div class="review__description">
									<p>
										<?php echo $comment->comment_content; ?><br>
										<?php echo $comment->comment_author; ?>
									</p>
								</div>
								<div class="review__location">
									<a href="<?php echo $comment->comment_author_url ?>">
										<?php echo get_metadata('comment', $comment->comment_ID, 'address', true) ?>
									</a>
								</div>
							</div>
						</div>
					<?php endforeach;
				else :
					?>
					<div class="no-post" style="margin: 0 auto;">
						<span style="font-size: 2rem;">Записей не найдено</span>
					</div>
				<?php endif;

				$args = array(
					'base'         => '%_%',
					'format'       => '?com=%#%',
					'total'        => $pages,
					'current'      => $page,
					'show_all'     => False,
					'end_size'     => 1,
					'mid_size'     => 2,
					'prev_next'    => false,
					'prev_text'    => __('&laquo; Previous'),
					'next_text'    => __('Next &raquo;'),
					'type'         => 'list'
				);
				// ECHO THE PAGENATION
				echo '<div id="pagination">' . paginate_links($args) . '</div>';
				?>
				<script>
					jQuery(document).ready(function() {
						jQuery('ul li:first-child a').attr('href', '?com=1');
					});
				</script>
</section>
<!-- review__form -->
<section class="review__form" class="bg_color">
	<div class="conteiner m-auto">
		<div class="head">
			<h4>
				оставить отзыв
			</h4>
		</div>

		<?php
		add_filter('comment_form_default_fields', 'extend_comment_custom_default_fields');
		function extend_comment_custom_default_fields($fields)
		{

			$commenter = wp_get_current_commenter();
			$req       = get_option('require_name_email');
			$aria_req  = ($req ? " aria-required='true'" : '');

			$fields['author'] = '<div>' .
				'<input id="author" name="author" type="text" value="' . esc_attr($commenter['comment_author']) .
				'" size="30" tabindex="1"' . $aria_req . ' placeholder="Ваше имя*"/></div>';

			$fields['email'] = '';

			$fields['url'] = '';

			$fields['address'] = '<div>' .
				'<input id="address" name="address" type="text" size="30"  tabindex="4" placeholder="Адрес объекта*"/></div>';

			return $fields;
		}

		add_filter('comment_form_fields', 'kama_reorder_comment_fields');
		function kama_reorder_comment_fields($fields)
		{
			//print_r( $fields ); // посмотрим какие поля есть

			$new_fields = array(); // сюда соберем поля в новом порядке

			$myorder = array('author', 'address', 'comment', 'url', 'email'); // нужный порядок

			foreach ($myorder as $key) {
				$new_fields[$key] = $fields[$key];
				unset($fields[$key]);
			}

			// если остались еще какие-то поля добавим их в конец
			if ($fields) {
				foreach ($fields as $key => $val) {
					$new_fields[$key] = $val;
				}
			}

			return $new_fields;
		}


		comment_form([
			'id_form'              => 'review__form',
			'comment_field'        => '<div>
                                <textarea id="comment" name="comment" cols="45" rows="8"  aria-required="true" required="required" placeholder="Текст отзыва*"></textarea>
                                </div>',
			'label_submit'         => 'Отправить',
			'title_reply'          => '',
			'comment_notes_before' => '',
			'comment_notes_after'  => '<p>Отправляя заявку вы соглашаетесь с <a href="http://viking-stroy.ru/privacy-policy">политикой конфиденциальности</a></p>'
		]);

		?>
	</div>
</section>
<!-- video reviews -->
<section id="video__reviews" class="bg_color">
	<div class="conteiner m-auto">
		<div class="head">
			<h2 class="m-auto">
				Видеоотзывы
			</h2>
		</div>
		<div class="content">
			<?php $array_video = carbon_get_theme_option('video_reveiws');
			foreach ($array_video as $video) : ?>
				<div class="video__reviews">
					<iframe class="uk-responsive-width uk-border-rounded" width="1500" height="1080" src="<?php echo $video['video_re'] ?>" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen uk-responsive style="220px">
					</iframe>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php get_footer(); ?>