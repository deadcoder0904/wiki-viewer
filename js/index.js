$(document).ready(function () {
    var box = $('#inputBox');
    var noinput = $('#no-input');
    var button = $('#button');
    var output = $('#results');
    var pages;
    var page = 'https://en.wikipedia.org/?curid=';

    $('.list-group').on("click",'.list-group-item',function(){
        $('.list-group-item').removeClass('active');
        $(this).addClass('active');
    });

    button.click(function() {
        var results = [];
        output.html('');
        var val = box.val();
        if (val !== "") {
            var url = "https://en.wikipedia.org/w/api.php?format=json&action=query" +
                "&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts" +
                "&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=" + val;

            $.ajax({
                url: url,
                dataType: 'jsonp',
                success: function (data) {
                    if(data.query !== undefined)
                    {
                        pages = data.query.pages;
                        $.each(pages,function(k,v){
                            results.push({
                                title: v.title,
                                body: v.extract,
                                page: page + k
                            });
                        });
                    for(var i in results)
                        output.append("<a href='" + results[i].page + "' class='list-group-item' target='_blank'>" +
                            "<h4 class='list-group-item-heading'>" + results[i].title + "</h4>" +
                            "<p class='list-group-item-text'>" + results[i].body + "</p>" +
                            "</a><br />");

                    }
                    else {
                        $('#error').html('No Results Found.');
                        noinput.css('display','block');
                    }
                }
            });

            noinput.css('display','none');
        }
        else {
            $('#error').html('Please enter a Search Term...');
            noinput.css('display','block');
        }
    });
});