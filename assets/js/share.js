(function() {

    // Default params
    var params = [];

    params['url']         = '';
    params['text']        = '';
    params['hashtags']    = '';
    params['via']         = '';
    params['related']     = '';
    params['in-reply-to'] = '';
    params['title']       = '';
    params['summary']     = '';
    params['source']      = '';
    params['media']       = '';
    params['description'] = '';

    // Read a page's GET URL variables and return them as an associative array.
    // Source: http://jquery-howto.blogspot.com/2009/09/get-url-parameters-values-with-jquery.html
    var vars = [],
        hashes,
        hash;

    hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        params.push(hash[0]);
        params[hash[0]] = hash[1];
    }

    // Set title
    document.title = 'Share '+params.title || 'Share '+params.subject || 'Share this page';

    /**
     * Hide services based on hide-services param.
     */
    if (params['hide-services'] !== undefined) {
        var servicesToHide = params['hide-services'].split(',');

        servicesToHide.forEach(function(service) {
            var element = document.querySelectorAll('.services-'+service)[0];

            element.parentNode.removeChild(element);
        });
    }

    /**
     *  Share service URLs.
     */
    var emailSubject = params.subject || params.title || 'Check this out',
        emailBody    = params.body || params.text || params.description || params.summary;

    emailBody += '\n\n'+params.url;

    var serviceUrls = {
        twitter:    'https://twitter.com/share?url='+params.url+'&text='+params.text+'&hashtags='+params.hashtags+(params.via != '' ? '&via='+params.via : '')+'&related='+params.related+'&in-reply-to='+params['in-reply-to'],
        facebook:   'https://www.facebook.com/sharer/sharer.php?u='+params.url,
        googleplus: 'https://plus.google.com/share?url='+params.url,
        reddit:     'https://www.reddit.com/submit?url='+params.url,
        tumblr:     'https://www.tumblr.com/share/link?url='+params.url,
        linkedin:   'https://www.linkedin.com/shareArticle?mini=true&url='+params.url+'&title='+params.title+'&summary='+params.summary+'+&source='+params.source,
        pinterest:  'https://www.pinterest.com/pin/create/button/?url='+params.url+'&media='+params.media+'&description='+params.description,
        delicious:  'https://delicious.com/save?v=5&noui&jump=close&url='+params.url,
        email:      'mailto:?subject='+emailSubject+'&body='+emailBody
    };

    // Update href on service URLs
    for (var key in serviceUrls) {
        if (serviceUrls.hasOwnProperty(key)) {
            var serviceElement = document.querySelectorAll('.services-'+key+' a')[0];

            if (serviceElement) {
                serviceElement.href = serviceUrls[key];
            }
        }
    }

})();
