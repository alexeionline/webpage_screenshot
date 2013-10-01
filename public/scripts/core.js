(function () {

	submit.addEventListener('click', function () {
		var imgQueryString;

		var url = page_url.value;
		var imgSize = img_width.value + 'x' + img_height.value;
		var vwpSize = vwp_width.value + 'x' + vwp_height.value;

		imgQueryString = '/api/v1/screenshot?url=' + url + '&size=' + imgSize + '&viewport=' + vwpSize;


		result_img.className = 'hidden';
		result_img.src = imgQueryString;

		result_img.addEventListener('load', function () {
			result_img.className = '';
		})
	})

}())