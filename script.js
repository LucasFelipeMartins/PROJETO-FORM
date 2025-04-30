let b7validator = {

    naoEnvia: (event) => {

        event.preventDefault();

        let permissao = true

        let inputs = document.querySelectorAll('input');

        b7validator.clearErros();

        for(let i = 0; i < inputs.length; i++){

            let input = inputs[i];

            let check = b7validator.check(input);

            if(check != true){

                permissao = false;

                b7validator.exibiErro(input, check);

            }

        }

        if(permissao){

            form.submit();

        }
    },


    check:(input) =>{

        let regras = input.getAttribute('data-rules');

        if(regras != null){

            regras = regras.split('|');

            for(let k in regras){

                let detalhes = regras[k].split('=');

                switch(detalhes[0]){
                    case 'required':

                        if(input.value == ''){

                            return 'Campo não preenchido';

                        }

                    break;

                    case 'min':

                        if(input.value.length < detalhes[1]){

                            return 'quantida de caracteres baixa';

                        }

                    break;

                }

            }


        }

        return true;

    },

    exibiErro:(input, erro) => {


        input.style.borderColor = '#f00';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = erro;

        input.parentElement.insertBefore(errorElement, input.ElementSibling)
        
    },

    clearErros:() => {

        let errorElement = document.querySelectorAll('.error');

        let input = form.querySelectorAll('input');


        for(let i = 0; i < input.length; i++){

            input[i].style.borderColor = '';


        }

        for(let i = 0; i < errorElement.length; i++){

            errorElement[i].remove();

        }

    }

}

let form = document.querySelector('.b7validator');

document.addEventListener('submit', b7validator.naoEnvia);