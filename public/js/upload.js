$(document).ready( function() {
    var search = getQueryString('search')
    $('#search-text').html(search)

    $(document).on('change', '.btn-file :file', function() {
    var input = $(this),
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
    input.trigger('fileselect', [label]);
    });

    $('.btn-file :file').on('fileselect', function(event, label) {
        
        var input = $(this).parents('.input-group').find(':text'),
            log = label;
        
        if( input.length ) {
            input.val(log);
        } else {
            if( log ) alert(log);
        }
    
    });
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                $('#img-upload').attr('src', e.target.result);
            }
            
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imgInp").change(function(){
        readURL(this);
    });

    var tag_inputs = []

    $('.tag-input').keyup(function(e) {
        var tag_input = $('.tag-input').val();
        if(e.keyCode == 13 || e.keyCode == 32) {
            if(tag_input.length != 1){
                var tags = []
                tags = $('.tag-field').children()

                var doesNotExist = true
                tags.each(function(){
                    console.log(this)
                    let input = $('.tag-input').val()
                    if (input.trim() === $(this).text().trim())
                        doesNotExist = false
                })
                
                if (doesNotExist === true && tag_input !== ""){
                    $('.tag-field').append("<a class='btn added-tag'>"+ tag_input+"</a>")
                    $('.tag-input').val("")
                    tag_inputs.push(tag_input.trim())
                    console.log(JSON.stringify(tag_inputs))
                } else{
                    $('.tag-input').val("")
                }
            }
        }
    })
    $(document).on('click', '.added-tag', function() {
        $(this).remove();
        tag_inputs.splice(tag_inputs.indexOf(tag_input), 1)
    })

    $(document).on('click', '.content-img', function() {
        var parent = $(this).parent().parent().parent()[0].children
        $('.modal-title').html(parent[0].children[0].children[0].childNodes[0].data)
        $('.img-preview').attr('src', $(this).attr('src'))
    })

    $("#uploadform").submit(function(){
        var tagToSend = ""

        for (let i = 0; i < tag_inputs.length; i++){
            if (i == tag_inputs.length - 1)
                tagToSend = tagToSend.concat(tag_inputs[i])
            else
                tagToSend = tagToSend.concat(tag_inputs[i] + ",")
        }
        $("<input/>").attr("type", "text")
                   .attr("name", "tags")
                   .attr("value", tagToSend)
                   .appendTo("#uploadform")
    })
    // $("#post").on('click',function(e){
    //     e.preventDefault()
    //     alert("Successfully Uploaded")
    //     location.reload(true)
    // })
})

var getQueryString = function(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i')
    var string = reg.exec(href);
    return string ? string[1] : null
}