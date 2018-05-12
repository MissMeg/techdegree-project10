$( document ).ready(() => {
  //FORM VALIDATION////
  //Set focus on the first field
    $('#title').focus();
    $('#first_name').focus();

  //NEW BOOK, NEW PATRON, DETAIL PAGES///
  //Make sure the required fields have text
    $('.validate').keyup((e)=>{
      $('#warn').remove();
      if (isNaN($(e.target).val())) {
        $(e.target).removeClass('bg-danger');
        $('#warn').remove();
        $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
      } else {
        $(e.target).addClass('bg-danger');
        $('form').prepend('<p id="warn">Please complete the field using letters and numbers only.</p>');
        $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
      }
    });

  //NEW BOOK///
  //Make sure fields have values in order to submit and no warnings are present
    $('.bookSubmit').click((e)=>{
      if (!$('#title').val() || !$('#author').val() || !$('#genre').val()) {
        e.preventDefault();
        $('form').prepend('<p id="warn">Please complete required fields. (Title, Author, and Genre)</p>');
        $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
      } else {
        $('#warn').remove();
        $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
      }
    });

  //NEW PATRON
  //Test if email is a valid email address
    $('#email').keyup((e)=>{
      $('#warn').remove();
      let emailVal = $('#email').val();
      let test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (test.test(emailVal)){
        $(e.target).removeClass('bg-danger');
        $('#warn').remove();
        $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
      } else if (!test.test(emailVal)) {
        $(e.target).addClass('bg-danger');
        $('form').prepend('<p id="warn">Please enter a valid email.</p>');
        $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
      }
    });

  //Check if library_id is a number
    $('#library_id').keyup((e)=>{
      $('#warn').remove();
      if ( !isNaN($('#library_id').val())) {
        $(e.target).removeClass('bg-danger');
        $('#warn').remove();
        $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
      } else {
        $(e.target).addClass('bg-danger');
        $('form').prepend('<p id="warn">Please use only numbers for the library id.</p>');
        $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
      }
    });

    //Check if zip_code is a 5 digit number
      $('#zip_code').keyup((e)=>{
        $('#warn').remove();
        let zipVal = $('#zip_code').val();
        if ( !isNaN(zipVal)) {
          let numbers = zipVal.split('');
          if (numbers.length === 5) {
            $(e.target).removeClass('bg-danger');
            $('#warn').remove();
            $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
          } else {
            $(e.target).addClass('bg-danger');
            $('form').prepend('<p id="warn">Please enter a valid 5 digit zip code.</p>');
            $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
          }
        } else {
          $(e.target).addClass('bg-danger');
          $('form').prepend('<p id="warn">Please use only numbers for the zip code.</p>');
          $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
        }
      });

    //Make sure fields have values in order to submit and no warnings are present
        $('.patronSubmit').click((e)=>{
          if (!$('#first_name').val() || !$('#last_name').val() || !$('#address').val() || !$('#email').val() || !$('#library_id').val() || !$('#zip_code').val()) {
            e.preventDefault();
            $('form').prepend('<p id="warn">Please complete all fields.</p>');
            $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
          } else {
            $('#warn').remove();
            $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
          }
        });

    //Return Book
    //make sure the required field isnt empty
      $('#returned_on').focusout((e)=> {
        $('#warn').remove();
        $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
        if (!$('#returned_on').val()) {
          e.preventDefault();
          $('form').prepend('<p id="warn">Please choose a date for the return.</p>');
          $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
        } else {
          $('#warn').remove();
          $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
        }
      });

    //New Loan
    //make sure the fields are not empty (auto populated select fields cannot remove a selection so focusing only on dates)
    $('.dates').focusout((e)=> {
      $('#warn').remove();
      $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
      if (!$('#loaned_on').val() || !$('#return_by').val() ) {
        e.preventDefault();
        $('form').prepend('<p id="warn">Please choose dates for both date fields.</p>');
        $(':input[type="submit"]').prop('disabled', true).addClass('disabled');
      } else {
        $('#warn').remove();
        $(':input[type="submit"]').prop('disabled', false).removeClass('disabled');
      }
    });
});
