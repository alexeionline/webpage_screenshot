(function () {

	submit.addEventListener('click', function () {
		var imgQueryString;

		var url = page_url.value;
		var imgSize = img_width.value + 'x' + img_height.value;
		var vwpSize = vwp_width.value + 'x' + vwp_height.value;

		imgQueryString = '/api/v1/screenshot?url=' + url + '&size=' + imgSize + '&viewport=' + vwpSize;

		loodingText.className = '';
		errorText.className = 'hidden';
		resultImgBlock.className = 'hidden';
		buttonsBlock.className = 'hidden';

		result_img.src = imgQueryString;

		result_img.addEventListener('load', function () {
			resultImgBlock.className = '';
			buttonsBlock.className = '';
			loodingText.className = 'hidden';
		})

		result_img.addEventListener('error', function () {
			loodingText.className = 'hidden';
			buttonsBlock.className = 'hidden';
			errorText.className = '';
		})
	})

	uploadToServer.addEventListener('click', function () {
		
		var queryString = result_img.src.replace('/api/v1/screenshot', '/api/v1/upload');

		var xhr = new XMLHttpRequest();
		
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				uploadToServerUrl.value = JSON.parse(xhr.responseText).url;
			}
		}

		xhr.open('GET', queryString, true);
		xhr.send(null);
	});

	downloadFromServer.addEventListener('click', function () {
		var queryString = result_img.src.replace('/api/v1/screenshot', '/api/v1/download');
		location.href = queryString;
	});

}())