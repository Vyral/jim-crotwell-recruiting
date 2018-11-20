var signupFormObj = {

    error_string: "",
    element_count: "1",

    drawForm: function() {
        if(this.error_string != '') {
            document.write(this.error_string);
        }
        else {
            //All old forms will be calling a drawForm method on signupFormObj
            //with no paramaters passed in.
            var json_data = {"content": "\n\n<div class=\"e2ma_signup_form\" id=\"e2ma_signup_form\">\n    \n    <div class=\"e2ma_signup_message\" id=\"e2ma_signup_message\">    \n        <div style=\"text-align: center;\"><span style=\"font-family: arial, helvetica, sans-serif;\"><strong><span style=\"font-size: 20pt;\">How to Sell More Homes</span></strong></span></div>\n<div style=\"text-align: center;\"><span style=\"font-size: 18pt; font-family: arial, helvetica, sans-serif;\"><br /></span></div>\n<div style=\"text-align: center;\"><span style=\"font-family: arial, helvetica, sans-serif;\">Whether you are just starting out, or you are licensed Broker, our team of professionals can answer any questions you might have about real estate. Subscribe to this blog to get the latest news on local market trends and receive expert tips for buying or selling a home.</span></div>\n    </div>\n    <div class=\"e2ma_signup_form_container\" id=\"e2ma_signup_form_container\">\n        <form method=\"post\" id=\"e2ma_signup\" onSubmit=\"return signupFormObj.checkForm(this)\" action=\"https://app.e2ma.net/app2/audience/signup/1888398/1894685/\" >\n    \n    <input id=\"id_prev_member_email\" name=\"prev_member_email\" type=\"hidden\" />\n    \n    <input id=\"id_source\" name=\"source\" type=\"hidden\" />\n    \n    \n    \n    <input id=\"id_group_18303261\" name=\"group_18303261\" type=\"hidden\" value=\"18303261\" />\n    \n      <input type=\"hidden\" name=\"private_set\" value=\"{num_private}\">\n\n    \n    \n    \n    \n    \n    <div class=\"e2ma_signup_form_row\">\n      <div class=\"e2ma_signup_form_label\">\n        Email\n        \n        <span class=\"e2ma_signup_form_required_asterix\">*</span>\n        \n      </div>\n      <div class=\"e2ma_signup_form_element\"><input id=\"id_email\" name=\"email\" type=\"email\" /></div>\n    </div>\n    \n    \n    \n    \n\n\n\n\n    <div class=\"e2ma_signup_form_required_footnote\"><span class=\"e2ma_signup_form_required_asterix\">*</span> = required field</div>\n    <div class=\"e2ma_signup_form_button_row\" id=\"e2ma_signup_form_button_row\">\n    <input id=\"e2ma_signup_submit_button\" class=\"e2ma_signup_form_button\" type=\"submit\" name=\"Submit\" value=\"Submit\" {disabled}>\n    </div>\n  </form>\n  </div>\n</div>\n<script type=\"text/javascript\">\n    (function() {\n        var loadCheckEl = document.getElementById('load_check');\n\n        // Hide the link to emma\n        if (loadCheckEl) {\n            loadCheckEl.style.display = 'none';\n        }\n    })();\n</script>\n"};

            //print form
            document.write(json_data.content);

        }
    },

    checkForm: function(form_obj) {
        //now handle required field validation
        json_fields = {"data": [{"widget_type": "text", "field_type": "text", "required": true, "name": "Email", "short_name": "email"}]};
        var element_array = json_fields.data;
        var why = "";
        for (var loop = 0; loop < element_array.length; loop++)
        {
            if(element_array[loop].widget_type == 'text' || element_array[loop].widget_type == 'long')
            {
                if(form_obj[element_array[loop].short_name].value == "")
                {
                    why += element_array[loop].name + " is a required field.\n"
                }
                else if(element_array[loop].short_name == 'email')
                {
                    var filter=/^[a-z0-9_\-\.\+]+@[a-z0-9_\-\.]+\.[a-z]{2,4}$/i;

                    if (!filter.test(form_obj[element_array[loop].short_name].value))
                    {
                        why += element_array[loop].name + " must be a valid email address.\n";
                    }
                }
                continue;
            }
            else if (element_array[loop].widget_type == 'check_multiple')
            {
                var element = form_obj[element_array[loop].short_name];
                if(signupFormObj.checkMulti(element))
                {
                    continue;
                }
                why += element_array[loop].name + " is a required field.\n";
            }
            else if (element_array[loop].widget_type == 'radio')
            {
                var flag = 'false';
                var element = form_obj[element_array[loop].short_name];
                if (signupFormObj.checkMulti(element))
                {
                    continue;
                }
                why += element_array[loop].name + " is a required field.\n";
            }
            else if (element_array[loop].widget_type == 'select one')
            {
                var index = form_obj[element_array[loop].short_name].selectedIndex;
                if(form_obj[element_array[loop].short_name].options[index].value == "")
                {
                    why += element_array[loop].name + " is a required field.\n";
                }
            }
            else if (element_array[loop].widget_type == 'select multiple')
            {
                var element = form_obj[element_array[loop].short_name];
                if(!signupFormObj.checkSelMulti(element)) {
                    why += element_array[loop].name + " is a required field.\n";
                }
            }
            else if (element_array[loop].widget_type == 'date')
            {
                var str_month = element_array[loop].widget_type + "_month";
                var str_day = element_array[loop].widget_type + "_day";
                var str_year = element_array[loop].widget_type + "_year";

                if (form_obj[str_month].selectedIndex < 1 || form_obj[str_day].selectedIndex < 1 || form_obj[str_year].selectedIndex < 1)
                {
                    why += element_array[loop].name + " is a required field.\n";
                }
            }
        }
        if (why != "") {
            alert(why);
            return false;
        }

        return true;

    },

    checkSelMulti: function (element) {
        for(var i = 0; i < element.length; i++) {
            if(element[i].selected) {
                return true;
            }
        }
        return false;
    },

    checkMulti: function (element) {
        for (var i = 0; i < element.length; i++) {
            if (element[i].checked)
            {
                return true;
            }
        }
        return false;
    }
}
