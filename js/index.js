 var fullNameElement = document.getElementById('fullName');
 var phoneNumberElement = document.getElementById('phoneNumber');
 var emailAddressElement = document.getElementById('emailAddress');
 var addressElement = document.getElementById('address');
 var groupElement = document.getElementById('group');
 var notesElement = document.getElementById('notes');
 var isFavoriteElement = document.getElementById('isFavorite');
 var isEmergencyElement = document.getElementById('isEmergency');

//  contacts count
var totalContactsElement = document.getElementById('totalContacts');
var contactsCountElement = document.getElementById('contactsCount');
var favoritesCountElement = document.getElementById('favoritesCount');
var emergencyCountElement = document.getElementById('emergencyCount');

// contacts list
var contactList = document.getElementById('contactList');

// emergency list
var emergencyList = document.getElementById('emergencyList');
// favorites list
var favoritesList = document.getElementById('favoritesList');

 // modal
 var modal = document.getElementById('addContactModal');
  

// buttons
var saveContactBtn = document.getElementById('saveContactBtn');
var updateContactBtn = document.getElementById('updateContactBtn');

// search input
var searchInput = document.getElementById('searchInput');

// load contacts from localStorage on page load
var contacts = JSON.parse(localStorage.getItem('contacts')) || [];
displayContacts(contacts);

// save contact
function saveContact() {


    var newContact={
        id: Date.now(),
        fullName: fullNameElement.value,
        phoneNumber: phoneNumberElement.value,
        emailAddress: emailAddressElement.value,
        address: addressElement.value,
        notes: notesElement.value,
        group: groupElement.value,
        isFavorite: isFavoriteElement.checked,
        isEmergency: isEmergencyElement.checked
    };
    
    contacts.push(newContact);
    // localstorage
    saveToLocalStorage(contacts);
 
   Swal.fire({title: "Contact Saved!",
  icon: "success"}); 

closeModal();

displayContacts(contacts);

console.log(contacts);


}

// clear form
function clearForm() {
    fullNameElement.value = '';
    phoneNumberElement.value = '';
    emailAddressElement.value = '';
    addressElement.value = '';
    notesElement.value = '';
    groupElement.value = '';
    isFavoriteElement.checked = false;
    isEmergencyElement.checked = false;
}


// close modal
function closeModal(){
    clearForm();
     var modalDiv = bootstrap.Modal.getInstance(modal);
     modalDiv.hide();
  
}

// save to local storage
function saveToLocalStorage(data) {
    localStorage.setItem('contacts',JSON.stringify(data));
}

// function deleteFromLocalStorage(data) {
//     localStorage.removeItem('contacts');
// }


//display contacts
function displayContacts(data) {

    totalContactsElement.innerHTML = contacts.length;
    contactsCountElement.innerHTML = contacts.length;
    var favCout =0 , emergCount=0;
   
    if(data.length === 0) {
        contactList.innerHTML = `  <p class="alert alert-danger text-center">No contacts found</p> `;
        
        return;
    }

 var box =""
    var favBox = "";
    var emergBox = "";
    for(var i = 0; i < data.length; i++){
      
        box+=`
        <div class="col-md-6">

              <div class="contact-card bg-white p-2 border-0 rounded-3">
                <div class="contact-header d-flex align-items-center gap-2 mb-2">
                  <div class="contact-avatar ${data[i].isFavorite &&" favorite"} ${data[i].isEmergency &&" emergency"} position-relative d-flex align-items-center justify-content-center fw-bold fs-5 text-white bg-primary">
                    ${data[i].fullName.split(' ')[0][0]}
                  </div>
                  <div class="contact-info">
                    <h4 class="fs-5 fw-bold">${data[i].fullName}</h4>
                  </div>
                </div>
                <div class="contact-details d-flex flex-column gap-2 mb-2">
                  <div class="contact-detail phone d-flex align-items-center gap-2">
                    <i class="fas fa-phone"></i>
                    <span>${data[i].phoneNumber}</span>
                  </div>
                  <div class="contact-detail email d-flex align-items-center gap-2">
                    <i class="fas fa-envelope"></i>
                    <span>${data[i].emailAddress}</span>
                  </div>
                  <div class="contact-detail address d-flex align-items-center gap-2">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${data[i].address}</span>
                  </div>
                </div>
                <div class="contact-tags d-flex flex-wrap mb-2 gap-2">
                  <span class="tag d-inline-flex align-items-center gap-1 border-0 rounded-3 py-2 px-1 ${data[i].group}">${data[i].group}</span>
                  ${data[i].isEmergency ? '<span class="tag emergency"><i class="fas fa-heartbeat"></i> Emergency</span>' : ''}
                  ${data[i].isFavorite ? '<span class="tag favorites"><i class="fas fa-heartbeat"></i> favorite</span>' : ''}
                </div>
                <div class="contact-actions d-flex gap-1 p-2 border-top">
                  <a class="contact-action call d-flex align-items-center justify-content-center p-2 border-0 rounded-3" href="tel:${data[i].phoneNumber}">
                    <i class="fas fa-phone"></i>
                  </a>
                  <a class="contact-action email d-flex align-items-center justify-content-center p-2 border-0 rounded-3" href="mailto:${data[i].emailAddress}">
                    <i class="fas fa-envelope"></i>
                  </a>
                  <button onclick="toggleFavorite(${data[i].id})" class="contact-action ${data[i].isFavorite &&" active"} favorite d-flex align-items-center justify-content-center p-2 border-0 rounded-3">
                    <i class="far fa-star"></i>
                  </button>
                  <button onclick="toggleEmergency(${data[i].id})" class="contact-action ${data[i].isEmergency &&" active"} emergency d-flex align-items-center justify-content-center p-2 border-0 rounded-3">
                    <i class="far fa-heart"></i>
                  </button>
                  <button
                   data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                  class="contact-action d-flex align-items-center justify-content-center p-2 border-0 rounded-3" title="Edit" onclick="getContactForUpdate(${data[i].id})">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button onclick="deleteContact(${data[i].id})" class="contact-action delete d-flex align-items-center justify-content-center p-2 border-0 rounded-3" title="Delete">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
                  </div>
                  `                                         
        if(data[i].isFavorite) {
            favBox +=`
          <div class="sidebar-contact-card d-flex align-items-center justify-content-between gap-2">
                                        <div class="d-flex align-items-center gap-2">
                                            <div
                                                class="sidebar-contact-avatar bg-primary text-white fw-bold py-2 px-3 border-0 rounded-3 d-flex align-items-center justify-content-center">
                                                ${data[i].fullName.split(' ')[0][0]}
                                            </div>
                                            <div class="">
                                                <h5 class="fs-6 fw-bold m-0">${data[i].fullName}</h5>
                                                <p>${data[i].phoneNumber}</p>
                                            </div>
                                        </div>
                                        <button
                                            class="sidebar-call-btn favorites-call">
                                            <i class="fas fa-phone"></i>
                                        </button>
                                    </div>
            ` ;
        }
        if(data[i].isEmergency) {
            emergBox +=`
            <div class="sidebar-contact-card d-flex align-items-center justify-content-between gap-2">
                                        <div class="d-flex align-items-center gap-2">
                                            <div
                                                class="sidebar-contact-avatar bg-primary text-white fw-bold py-2 px-3 border-0 rounded-3 d-flex align-items-center justify-content-center">
                                                ${data[i].fullName.split(' ')[0][0]}
                                            </div>
                                            <div class="">
                                                <h5 class="fs-6 fw-bold m-0">${data[i].fullName}</h5>
                                                <p>${data[i].phoneNumber}</p>
                                            </div>
                                        </div>
                                        <button
                                            class="sidebar-call-btn emergency-call">
                                            <i class="fas fa-phone"></i>
                                        </button>
                                    </div>
            ` ;
        }

        if(data[i].isFavorite) {
            favCout++;
        }
        if(data[i].isEmergency) {
            emergCount++;
        }
    }

    contactList.innerHTML = box;
    favoritesList.innerHTML = favBox;
    emergencyList.innerHTML = emergBox;

    favoritesCountElement.innerHTML = favCout;
    emergencyCountElement.innerHTML = emergCount;

 
   
  
}


//delete contacts
function deleteContact(index) {

    Swal.fire({
  title: "Are you sure u want to delete this contact?",

  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#10b981",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed){

    var temp = getContactById(index);
    var index = contacts.indexOf(temp);
    contacts.splice(index, 1);
 
    saveToLocalStorage(contacts);
    displayContacts(contacts);

    Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
  } 
});
   
   
}


var updateId = -1;

//get contacts foe update
function getContactForUpdate(index) {

    updateId = index;
    var currentContact = null;
 for(var i = 0 ; i < contacts.length ; i++){
        if(contacts[i].id === updateId) {
            currentContact = i;
            break;
        }}
    fullNameElement.value = contacts[currentContact].fullName;
    phoneNumberElement.value = contacts[currentContact].phoneNumber;
    emailAddressElement.value = contacts[currentContact].emailAddress;
    groupElement.value = contacts[currentContact].group;
    notesElement.value = contacts[currentContact].notes;
    addressElement.value = contacts[currentContact].address;


    isFavoriteElement.checked = contacts[currentContact].isFavorite;
    isEmergencyElement.checked = contacts[currentContact].isEmergency;

    saveContactBtn.classList.add('d-none');
    updateContactBtn.classList.remove('d-none');
    
   
}

//updae contacts and display
function updateContact() {
       var updatedContact = {
        fullName: fullNameElement.value,
        phoneNumber: phoneNumberElement.value,
        emailAddress: emailAddressElement.value,
        group: groupElement.value,
        notes: notesElement.value,
        address: addressElement.value,
        isFavorite: isFavoriteElement.checked,
        isEmergency: isEmergencyElement.checked
       };

    var temp = getContactById(updateId);
    temp = { ...temp, ...updatedContact };
       saveToLocalStorage(contacts);
       displayContacts(contacts);

       saveContactBtn.classList.add('d-none');
       updateContactBtn.classList.remove('d-none');
       closeModal();

       Swal.fire({
        title: "Updated!",
        text: "Your contact has been updated.",
        icon: "success"
      });
       

   
}


// saveContactBtn.onclick = saveContact;
function searchContacts(input) {
// Debounce: wait 1 second after user stops typing
setTimeout(() => {
    var filterdData =[]
    for(var i = 0; i < contacts.length; i++) {
       if(contacts[i].fullName.toLowerCase().includes(input.toLowerCase()) || contacts[i].phoneNumber.includes(input) ||
        contacts[i].emailAddress.toLowerCase().includes(input.toLowerCase())) {
           filterdData.push(contacts[i]);
       }
    }
    displayContacts(filterdData);
    
}, 1000);

}

// Toggle favorite status
function toggleFavorite(id) {
    var temp = getContactById(id);
    temp.isFavorite = !temp.isFavorite;
    saveToLocalStorage(contacts);
    displayContacts(contacts);
}

// Toggle emergency status
function toggleEmergency(id) {
   var temp = getContactById(id)
    temp.isEmergency = !temp.isEmergency;
    saveToLocalStorage(contacts);
    displayContacts(contacts);
}

function getContactById(id) {
    for(var i = 0; i < contacts.length; i++) {
        if(contacts[i].id === id) {
            return contacts[i];
        }
    }
    return null;
}
