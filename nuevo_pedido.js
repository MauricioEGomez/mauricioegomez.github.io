const ubicacionField = document.querySelector("[ubicacion]");
ubicacionField.addEventListener("blur", function(e) {
    const field = e.target;
    const fieldValue = field.value;
    if (fieldValue.length === 0) {
        console.log("El campo ubicación está vacío");
    }
})




const geolocation = navigator.geolocation;
const position = (pos)=>{console.log(pos)};
const err = ()=> console.log(e);
const options = { 
    maximumAge: 0,
    timeout: 3000,
    enableHighAccuracy: true
};

geolocation.getCurrentPosition(position, err, options);