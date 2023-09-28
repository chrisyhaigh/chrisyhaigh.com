
// Search Bar Input 
$('#searchbar').keyup(function() {
  const searchQuery = $(this).val().toLowerCase();
  
  if ($('#personneldata').length > 0) {
    displayPersonnelSearch(searchQuery);
  }
  if ($('#departmentdata').length > 0) {
    displayDepartmentSearch(searchQuery);
  }
  if ($('#locationdata').length > 0) {
    displayLocationSearch(searchQuery);
  }
});


function displayPersonnelSearch(searchQuery) {

  const personnelTable = document.getElementById('personneldata');
  const rows = personnelTable.querySelectorAll('tr');

rows.forEach(function(row) {

    const name = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const jobTitle = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const email = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const department = row.querySelector('td:nth-child(4)').textContent.toLowerCase();
    const location = row.querySelector('td:nth-child(5)').textContent.toLowerCase();

    if(name.includes(searchQuery) || jobTitle.includes(searchQuery) || email.includes(searchQuery) || department.includes(searchQuery) || location.includes(searchQuery)) {
      row.style.display = 'table-row'
    } else {
      row.style.display = 'none';
    }
  });
}

function displayDepartmentSearch(searchQuery) {

  const departmentTable = document.getElementById('departmentdata');
  const rows = departmentTable.querySelectorAll('tr');

rows.forEach(function(row) {

    const department = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const location = row.querySelector('td:nth-child(2)').textContent.toLowerCase();

    if (department.includes(searchQuery) || location.includes(searchQuery)) {
      row.style.display = 'table-row'
    } else {
      row.style.display = 'none';
    }
  });
}

function displayLocationSearch(searchQuery) {

  const locationTable = document.getElementById('locationdata');
  const rows = locationTable.querySelectorAll('tr');

rows.forEach(function(row) {

  const location = row.querySelector('td:nth-child(1)').textContent.toLowerCase();

  if (location.includes(searchQuery)) {
    row.style.display = 'table-row'
  } else {
    row.style.display = 'none';
  }
});
}


// Create button to open create Modals

$('#createbutton').click(function() {
  if ($('#personnelbutton').hasClass('active')) {
      $('#createpersonnelmodal').modal('show');
  } else if ($('#departmentbutton').hasClass('active')) {
      $('#createdepartmentmodal').modal('show');
  } else if ($('#locationbutton').hasClass('active')) {
      $('#createlocationmodal').modal('show');
  }
});

// Refreshbutton

$('#refreshbutton').click(function() {
if ($('#personneltab').hasClass('active')) {
    $('#refreshpersonnel').removeClass('d-none');
    $('#personneldata').addClass('d-none');
    setTimeout(function () {
        $('#personneldata').removeClass('d-none');
        $('#refreshpersonnel').addClass('d-none');
        populatePersonnelTab();
    }, 600);
} else if ($('#departmenttab').hasClass('active')) {
    $('#refreshdepartment').removeClass('d-none');
    $('#departmentdata').addClass('d-none');
    setTimeout(function() {
        $('#departmentdata').removeClass('d-none');
        $('#refreshdepartment').addClass('d-none');
        populateDepartmentTab();
    }, 600);
} else if ($('#locationtab').hasClass('active')) {
    $('#refreshlocation').removeClass('d-none');
    $('#locationdata').addClass('d-none');
    setTimeout(function() {
        $('#locationdata').removeClass('d-none');
        $('#refreshlocation').addClass('d-none');
        populateLocationTab();
    }, 600);
}
});

// Filter Button to Open filter Modals

$('#filterbutton').click(function() {
  if ($('#personnelbutton').hasClass('active')) {
      $('#personnelfiltermodal').modal('show');
  } else if ($('#departmentbutton').hasClass('active')) {
      $('#departmentfiltermodal').modal('show');
  } else if ($('#locationbutton').hasClass('active')) {
      $('#locationfiltermodal').modal('show');
  }
});

// Populate Personnel Table

function populatePersonnelTab() {

    $.ajax({
        url: 'php/getAllPersonnel.php',
        type: 'GET',
        dataType: 'json',
        success: function(response) {
            let tBody = $('#personneldata');
            tBody.empty();

            response.data.forEach(function(person) {
                let row = $('<tr>');

                row.append(`<td class="align-middle text-nowrap" id="lastname">${person.lastName}, ${person.firstName}</td>`);
                row.append(`<td class="align-middle text-nowrap d-none d-lg-table-cell" id="jobtitle">${person.jobTitle}</td>`);
                row.append(`<td class="align-middle text-nowrap d-none d-lg-table-cell" id="email">${person.email}</td>`);
                row.append(`<td class="align-middle text-nowrap d-none d-lg-table-cell" id="department">${person.department}</td>`);
                row.append(`<td class="align-middle text-nowrap d-none d-lg-table-cell" id="location">${person.location}</td>`);
                row.append(`<td class="text-end text-nowrap">
                              <button class="btn btn-primary btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#updatepersonnelmodal" data-id="${person.id}">
                                  <i class="fas fa-pencil-alt"></i>
                              </button>
                              <button class="btn btn-danger btn-sm rounded-circle delete-personnel-button" data-bs-toggle="modal" data-id="${person.id}" data-name="${person.firstName} ${person.lastName}">
                                  <i class="fas fa-trash"></i>
                              </button>
                            </td>`);

                tBody.append(row);
            });

            tBody.on('click', '.delete-personnel-button', function() {
              let id = $(this).data('id');
              let name = $(this).data('name');

              $('#deletepersonnelID').val(id);
              $('#deletepersonnelname').text(name);
              $('#deletepersonnelmodal').modal('show');
            });

        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error retrieving personnel records:", jqXHR, textStatus, errorThrown);
        },
    });
}

// Delete Personnel Data

$('#deletepersonnelform').submit(function(e) {

  e.preventDefault();
  console.log('Personel deletion submission event triggered.');

  $.ajax({
      url: 'php/deletePersonnel.php',
      type: 'POST',
      dataType: 'json',
      data: {
          id: $('#deletepersonnelID').val(),
      },
      success: function(response) {
          console.log(response);
          if (response.status.code === 200) {
              console.log('Personnel Deleted from database');
              $('#deletepersonnelmodal').modal('hide');
          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error deleting personnel from database", jqXHR, textStatus, errorThrown);
      },
  });
});

// Populate Department Table

function populateDepartmentTab() {

$.ajax({
    url: 'php/getAllDepartments.php',
    type: 'GET',
    dataType: 'json',

    success: function(response){
        let tBody = $('#departmentdata');
        tBody.empty();

        response.data.forEach(function(departments){
            let row = $(`<tr>`);
            row.append(`<td class="align-middle">${departments.departmentName}</td>`);
            row.append(`<td class="d-none d-md-table-cell align-middle">${departments.locationName}</td>`);
            row.append(`<td class="text-end text-nowrap">
                            <button class="btn btn-primary btn-sm rounded-circle" data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#updatedepartmentmodal" data-id="${departments.id}">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btn btn-danger btn-sm rounded-circle delete-department-button" data-bs-toggle="modal" data-id="${departments.id}" data-name="${departments.departmentName}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>`);

            tBody.append(row);
            });
            
            // Check for dependencies before proceeding to delete

            tBody.on('click', '.delete-department-button', function() {

              let id = $(this).data('id');
              let name = $(this).data('name');

              $('#deletedepartmentID').val(id);
              $('#deletedepartmentname').text(name);

              $.ajax({
                  url: 'php/checkDepartmentDependencies.php',
                  type: 'POST',
                  dataType: 'json',
                  data: {
                    departmentID: $('#deletedepartmentID').val(),
                  },
                  success: function(response) {
                    if (response.dependenciesExist) {
                      $('#unabledeletedepartmentmodal').modal('show');
                      $('#numberpersonnel').text(response.dependencyCount);
                    } else {
                      $('#deletedepartmentmodal').modal('show');
                    }
                  },
              
                  error: function(jqXHR, textStatus, errorThrown) {
                    console.log("Error checking department dependencies", jqXHR, textStatus, errorThrown);
                  },
              });
            });
    },

    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error retrieving department records:", jqXHR, textStatus, errorThrown);
    },
  });
}

// Delete Department Data

$('#deletedepartmentmodal').on('click', '.btn-danger', function(e) {

  e.preventDefault();

  $.ajax({
      url: 'php/deleteDepartment.php',
      type: 'POST',
      dataType: 'json',
      data: {
          id: $('#deletedepartmentID').val(),
      },
      success: function(response) {
          console.log(response);
          if (response.status.code === 200) {
              console.log('Department deleted from database');

          } else {

          }
      },
      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error deleting department from database", jqXHR, textStatus, errorThrown);
      },
  });
});


// Populate Location Table

function populateLocationTab() {

$.ajax({
    url: 'php/getAllLocations.php',
    type: 'POST',
    dataType: 'json',

    success: function(response){
        let tBody = $('#locationdata');

        tBody.empty();

        response.data.forEach(function(office){
            let row = $(`<tr>`);
            
            row.append(`<td class="align-middle">${office.name}</td>`);
            row.append(`<<td class="text-end text-nowrap">
                            <button class="btn btn-primary btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#updatelocationmodal" data-id="${office.id}">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btn btn-danger btn-sm rounded-circle delete-location-button" data-bs-toggle="modal" data-id="${office.id}" data-name="${office.name}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </td>`);
        

            tBody.append(row);
            });
            
            // Check for dependencies before proceeding to delete

            tBody.on('click', '.delete-location-button', function() {

              let id = $(this).data('id');
              let name = $(this).data('name');

              $('#deletelocationID').val(id);
              $('#deletelocationname').text(name);

              $.ajax({
                  url: 'php/checkLocationDependencies.php',
                  type: 'POST',
                  dataType: 'json',
                  data: {
                      locationID: $('#deletelocationID').val(),
                  },
            
                  success: function(response) {
                      if (response.dependenciesExist) {
                        $('#unabledeletelocationmodal').modal('show');
                        $('#numberdepartments').text(response.dependencyCount);
                      } else {
                        $('#deletelocationmodal').modal('show');
                      }
                  },
            
                  error: function(jqXHR, textStatus, errorThrown) {
                      console.log("Error checking location dependencies", jqXHR, textStatus, errorThrown);
                  },
              });
            });
    },

    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error retrieving location records:", jqXHR, textStatus, errorThrown);
    },
  });
}

// Delete Location Data

$('#deletelocationmodal').on('click', '.btn-danger', function(e) {

  e.preventDefault();

  $.ajax({
      url: 'php/deleteLocation.php',
      type: 'POST',
      dataType: 'json',
      data: {
        id: $('#deletelocationID').val(),
      },

      success: function(response) {
          if (response.status.code === 200) {
            console.log('Location Deleted from database');;
          }
      },

      error: function(jqXHR, textStatus, errorThrown) {
          console.log("Error deleting location from database", jqXHR, textStatus, errorThrown);
      },
    });
});

$(document).ready(function() {
  populatePersonnelTab();
  populateDepartmentTab();
  populateLocationTab();
});

// Create Personnel

$("#createpersonnelmodal").on("show.bs.modal", function (e) {
  $("#create_firstname").val("");
  $("#create_lastname").val("");
  $("#create_jobtitle").val("");
  $("#create_email").val("");
  populateDepartmentDropdownInCP();
});

// Create Personnel records

$("#createpersonnelform").on("submit", function (e) {

  e.preventDefault();

  const data = {
    firstName: $("#create_firstname").val(),
    lastName: $("#create_lastname").val(),
    jobTitle: $("#create_jobtitle").val(),
    email: $("#create_email").val(),
    departmentID: $("#departmentdropdown").val()
  };


  $.ajax({
    url: 'php/insertPersonnel.php',
    type: 'POST',
    dataType: 'json',
    data: data,

    success: function (data) {
      let resultCode = data.status.code;

      if (resultCode == 200) {
        $("#createpersonnelmodal").modal("hide");

      } else {
        console.error("Error creating personnel record");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error creating personnel record:", errorThrown);
    }
  });
});

// Create Department

$("#createdepartmentmodal").on("show.bs.modal", function (e) {
  $("#create_departmentname").val("");
  populateLocationDropdownInCD();
});



$("#createdepartmentform").on("submit", function (e) {

  e.preventDefault();

  const data = {
    name: $('#create_departmentname').val(),
    locationID: $('#locationdropdown').val(),
  };


  $.ajax({
    url: 'php/insertDepartment.php',
    type: 'POST',
    dataType: 'json',
    data: data,

    success: function (data) {
      let resultCode = data.status.code;

      if (resultCode == 200) {
        console.log('New department created');
        $("#createdepartmentmodal").modal("hide");

      } else {
        console.error("Error creating department record");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error creating department record:", errorThrown);
    }
  });
});

// Create Location

$("#createlocationmodal").on("show.bs.modal", function (e) {
  $("#create_location").val("");
});


$("#createlocationform").on("submit", function (e) {
  // stop the default browser behavior
  e.preventDefault();

  const data = {
    locationName: $("#create_location").val(),
  };


  $.ajax({
    url: 'php/insertLocation.php',
    type: 'POST',
    dataType: 'json',
    data: data,

    success: function (data) {
      let resultCode = data.status.code;

      if (resultCode == 200) {
        console.log('New location created');
        $("#createlocationmodal").modal("hide");

      } else {
        console.error("Error creating location record");
      }
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error creating location record:", errorThrown);
    }
  });
});

// Update Personnel Modal

$("#updatepersonnelmodal").on("show.bs.modal", function (e) {

  $.ajax({
    url: 'php/fetchPersonnelByID.php',
    type: "POST",
    dataType: "json",
    data: {
      id: $(e.relatedTarget).attr("data-id"),
    },
    success: function (data) {
      let resultCode = data.status.code;

      if (resultCode == 200) {
        $("#updatepersonnelid").val(data.data.id);

        $("#update_firstname").val(data.data.firstName);
        $("#update_lastname").val(data.data.lastName);
        $("#update_jobtitle").val(data.data.jobTitle);
        $("#update_email").val(data.data.email);

        populateDepartmentDropdown();

        $("#update_departmentdropdown").val(data.data.departmentID);
        
      } else {
        $("#updatepersonnelmodal .modal-title").replaceWith(
          "Error retrieving data"
        );
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      $("#updatepersonnelmodal .modal-title").replaceWith(
        "Error retrieving data"
      );
    }
  });
});

$("#updatepersonnelform").on("submit", function (e) {
// stop the default browser behavior
  e.preventDefault();

  const data = {
      id: $("#updatepersonnelid").val(),

      updatedData: {
        firstName: $("#update_firstname").val(),
        lastName: $("#update_lastname").val(),
        jobTitle: $("#update_jobtitle").val(),
        email: $("#update_email").val(),
        departmentID: $("#update_departmentdropdown").val()
    }
  };

  $.ajax({
    url: 'php/updatePersonnel.php', 
    type: 'POST',
    dataType: 'json',
    data: data,

    success: function (data) {
      let resultCode = data.status.code;

      if (resultCode == 200) {
        console.log('Personnel record updated');
        $("#updatepersonnelmodal").modal("hide");
      } else {
        console.error("Error updating personnel data");
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error updating personnel data:", errorThrown);
    },
  });
});

// Populate Department dropdowns

function populateDepartmentDropdown() {

  $.ajax({
    url: 'php/getAllDepartments.php',
    type: 'GET',
    dataType: 'json',
    
    success: function (response) {
      const departmentDropdown = $("#update_departmentdropdown");
      departmentDropdown.empty();

      response.data.forEach(function (department) {
        departmentDropdown.append(
          $("<option>", {
            value: department.id,
            text: department.departmentName
          })
        );
      });
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error retrieving department data:", jqXHR, textStatus, errorThrown);
    },
  });
}

function populateDepartmentDropdownInCP() {

  $.ajax({
    url: 'php/getAllDepartments.php',
    type: 'GET',
    dataType: 'json',

    success: function (response) {
      const departmentDropdown = $("#departmentdropdown");
      departmentDropdown.empty();

      response.data.forEach(function (department) {
        departmentDropdown.append(
          $("<option>", {
            value: department.id,
            text: department.departmentName
          })
        );
      });
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.log("Error retrieving department data:", jqXHR, textStatus, errorThrown);
    },
  });
}

// Update Department Data

$("#updatedepartmentmodal").on("show.bs.modal", function (e) {
  $.ajax({
      url: 'php/fetchDepartmentByID.php',
      type: "POST",
      dataType: "json",
      data: {
          id: $(e.relatedTarget).attr("data-id"),
      },
      success: function (data) {
          let resultCode = data.status.code;

          if (resultCode == 200) {
              $("#updatedepartmentid").val(data.data.id);
              $("#update_departmentname").val(data.data.name);
              
              // Populate the location dropdown here
              populateLocationDropdown(data.data.locationID);
          } else {
              $("#updatedepartmentmodal .modal-title").replaceWith("Error retrieving data");
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          $("#updatedepartmentmodal .modal-title").replaceWith("Error retrieving data");
      }
  });
});

$("#updatedepartmentform").on("submit", function (e) {
  e.preventDefault();

  const data = {
      id: $("#updatedepartmentid").val(),
      updatedData: {
          name: $("#update_departmentname").val(),
          locationID: $("#update_locationdropdown").val()
      }
  };

  $.ajax({
      url: 'php/updateDepartment.php',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function (data) {
          let resultCode = data.status.code;

          if (resultCode == 200) {
              console.log('Department record updated');
              $("#updatedepartmentmodal").modal("hide");
          } else {
              console.error("Error updating department data");
          }
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.error("Error updating department data:", errorThrown);
      },
  });
});


// Populate Location dropdowns

function populateLocationDropdown() {

$.ajax({
    url: 'php/getAllLocations.php',
    type: 'GET',
    dataType: 'json',

    success: function(response) {
        const locationDropdown = document.getElementById('update_locationdropdown');
        locationDropdown.innerHTML = '';

        response.data.forEach(function(location) {
            const option = document.createElement('option');
            option.value = location.id;
            option.text = location.name;
            locationDropdown.appendChild(option);
        })
    },

    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error retrieving location data:", jqXHR, textStatus, errorThrown);
    },
})
}

function populateLocationDropdownInCD() {

$.ajax({
    url: 'php/getAllLocations.php',
    type: 'GET',
    dataType: 'json',

    success: function(response) {
        console.log(response);
        const locationDropdown = document.getElementById('locationdropdown');
        locationDropdown.innerHTML = '';

        response.data.forEach(function(location) {
            const option = document.createElement('option');
            option.value = location.id;
            option.text = location.name;
            locationDropdown.appendChild(option);
        })
    },

    error: function(jqXHR, textStatus, errorThrown) {
        console.log("Error retrieving location data:", jqXHR, textStatus, errorThrown);
    },
})
}

// Update Location Data

$("#updatelocationmodal").on("show.bs.modal", function (e) {

    $.ajax({
      url: 'php/fetchLocationByID.php',
      type: "POST",
      dataType: "json",
      data: {
        id: $(e.relatedTarget).attr("data-id")
      },

      success: function (data) {
        let resultCode = data.status.code;

        if (resultCode == 200) {
          $("#update_locationid").val(data.data.id);
          $("#update_location").val(data.data.name);
        } else {
          $("#updatelocationmodal .modal-title").replaceWith("Error retrieving data");
        }
      },
      error: function (jqXHR, textStatus, errorThrown) {
        $("#updatelocationmodal .modal-title").replaceWith("Error retrieving data");
      }
    });
});

$("#updatelocationform").on("submit", function (e) {

  e.preventDefault();

  const data = {
    id: $("#update_locationid").val(),
    updatedData: {
      name: $("#update_location").val(),
    }
  };

  $.ajax({
    url: 'php/updateLocation.php',
    type: 'POST',
    dataType: 'json',
    data: data,
    
    success: function (data) {
      if (data.status.code === '200') {
        console.log('Location record updated');
        $("#updatelocationmodal").modal("hide");
      } else {
        console.error("Error updating location data");
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error("Error updating location data:", errorThrown);
    },

  });
});

// Personnel Filter modal

function populatePersonnelFilterOptions() {

$.ajax({
  url: 'php/getAllDepartments.php',
  type: 'GET',
  dataType: 'json',

  success: function (data) {
    if (data.status.code === '200') {
      const departmentDropdown = $('#personnel_department');
      departmentDropdown.empty();

      data.data.forEach(function (department) {
        departmentDropdown.append(
          $('<option>', {
            value: department.id,
            text: department.departmentName,
          })
        );
      });
    } else {
      console.error('Error fetching department data:', data.status.description);
    }
  },

  error: function (jqXHR, textStatus, errorThrown) {
    console.error('Error fetching department data:', jqXHR, textStatus, errorThrown);
  },
});


$.ajax({
  url: 'php/getAllLocations.php',
  type: 'GET',
  dataType: 'json',
  
  success: function (data) {
    if (data.status.code === '200') {
      const locationDropdown = $('#personnel_location');
      locationDropdown.empty();

      data.data.forEach(function (location) {
        locationDropdown.append(
          $('<option>', {
            value: location.id,
            text: location.name,
          })
        );
      });
    } else {
      console.error('Error fetching location data:', data.status.description);
    }
  },

  error: function (jqXHR, textStatus, errorThrown) {
    console.error('Error fetching location data:', jqXHR, textStatus, errorThrown);
  },
});
}

$('#personnelfiltermodal').on('show.bs.modal', function () {
  populatePersonnelFilterOptions();
});

function filterPersonnelData() {
  const locationID = $('#personnel_location').val(); 
  const departmentID = $('#personnel_department').val();

  $.ajax({
    url: 'php/filterPersonnel.php',
    type: 'POST',
    dataType: 'json',
    data: {
      locationID: locationID,
      departmentID: departmentID,
    },

    success: function (data) {
      let tBody = $('#personneldata');
      tBody.empty();

      data.forEach(function (person) {
        const row = document.createElement('tr');

          row.innerHTML = `
            <td class="align-middle text-nowrap">${person.lastName}, ${person.firstName}</td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">${person.jobTitle}</td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">${person.email}</td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">${person.department}</td>
            <td class="align-middle text-nowrap d-none d-md-table-cell">${person.location}</td>
            <td class="text-end text-nowrap">
              <button class="btn btn-primary btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#updatepersonnelmodal" data-id="${person.id}">
                <i class="fas fa-pencil-alt"></i>
              </button>
              <button class="btn btn-danger btn-sm rounded-circle delete-personnel-button" data-bs-toggle="modal" data-bs-target="#deletepersonnelmodal" data-id="${person.id}" data-name="${person.firstName} ${person.lastName}">
                <i class="fas fa-trash"></i>
              </button>
            </td>`;
          
          tBody.append(row);
        });

        tBody.on('click', '.delete-personnel-button', function() {
          let id = $(this).data('id');
          let name = $(this).data('name');

          $('#deletepersonnelID').val(id);
          $('#deletepersonnelname').text(name);
        });
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Error filtering personnel data:', jqXHR, textStatus, errorThrown);
    },
  });
}

$('#filterpersonnelsave').on('click', function () {
  filterPersonnelData();
});

// Department Filter Modal

function populateDepartmentFilterOptions() {

$.ajax({
    url: 'php/getAllLocations.php',
    type: 'GET',
    dataType: 'json',
    
    success: function (data) {
      if (data.status.code === '200') {
        const locationDropdown = $('#department_location');
        locationDropdown.empty();

        data.data.forEach(function (location) {
          locationDropdown.append(
            $('<option>', {
              value: location.id,
              text: location.name,
            })
          );
        });
      } else {
        console.error('Error fetching location data:', data.status.description);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Error fetching location data:', jqXHR, textStatus, errorThrown);
    },
  });
}

$('#departmentfiltermodal').on('show.bs.modal', function () {
  populateDepartmentFilterOptions();
});


function filterDepartmentData() {
  const locationID = $('#department_location').val();

  $.ajax({
      url: 'php/filterDepartment.php',
      type: 'POST',
      dataType: 'json',
      data: {
          locationID: locationID,
      },

      success: function(data) {
          let tBody = $('#departmentdata');
          tBody.empty();

          data.forEach(function(department){
              let row = $(`<tr>`);

              row.append(`<td class="align-middle">${department.departmentName}</td>`);
              row.append(`<td class="d-none d-md-table-cell align-middle">${department.locationName}</td>`);
              row.append(`<td class="text-end text-nowrap">
                              <button class="btn btn-primary btn-sm rounded-circle update-department-button" data-bs-toggle="modal" data-bs-toggle="modal" data-bs-target="#updatedepartmentmodal" data-id="${department.id}">
                                  <i class="fas fa-pencil-alt"></i>
                              </button>
                              <button class="btn btn-danger btn-sm rounded-circle delete-department-button" data-bs-toggle="modal" data-bs-target="#deletedepartmentmodal" data-id="${department.id}" data-name="${department.departmentName}">
                                  <i class="fas fa-trash"></i>
                              </button>
                          </td>`);

              tBody.append(row);
          });

          tBody.on('click', '.delete-department-button', function() {
            let id = $(this).data('id');
            let name = $(this).data('name');

            $('#deletedepartmentID').val(id);
            $('#deletedepartmentname').text(name);
          });
      },

      error: function (jqXHR, textStatus, errorThrown) {
          console.error('Error filtering department data:', jqXHR, textStatus, errorThrown);
      },
  });
}

$('#filterdepartmentsave').click(function() {
  filterDepartmentData();
});

// Location filter Modal

function populateLocationFilterOptions() {

$.ajax({
    url: 'php/getAllLocations.php',
    type: 'POST',
    dataType: 'json',
    
    success: function (data) {
      if (data.status.code === '200') {
        const locationDropdown = $('#location_filter');
        locationDropdown.empty();

        data.data.forEach(function (location) {
          locationDropdown.append(
            $('<option>', {
              value: location.id,
              text: location.name,
            })
          );
        });
      } else {
        console.error('Error fetching location data:', data.status.description);
      }
    },

    error: function (jqXHR, textStatus, errorThrown) {
      console.error('Error fetching location data:', jqXHR, textStatus, errorThrown);
    },
});
}

$('#locationfiltermodal').on('show.bs.modal', function () {
  populateLocationFilterOptions();
});

function filterLocationData() {
  const locationID = $('#location_filter').val();

  $.ajax({
      url: 'php/filterLocation.php',
      type: 'POST',
      dataType: 'json',
      data: {
          locationID: locationID,
      },

      success: function(data) {
          let tBody = $('#locationdata');

          tBody.empty();

          data.forEach(function(location){
              let row = $(`<tr>`);
              
              row.append(`<td class="align-middle">${location.name}</td>`);
              row.append(`<td class="text-end text-nowrap">
                            <button class="btn btn-primary btn-sm rounded-circle update-location-button" data-bs-toggle="modal" data-bs-target="#updatelocationmodal" data-id="${location.id}">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="btn btn-danger btn-sm rounded-circle delete-location-button" data-bs-toggle="modal" data-bs-target="#deletelocationmodal" data-id="${location.id}" data-name="${location.name}">
                                <i class="fas fa-trash"></i>
                            </button>
                          </td>`);

              tBody.append(row);
          });

          tBody.on('click', '.delete-location-button', function() {
            let id = $(this).data('id');
            let name = $(this).data('name');

            $('#deletelocationID').val(id);
            $('#deletelocationname').text(name);
            $('#deletelocationmodal').modal('show');
          });
      },
      
      error: function (jqXHR, textStatus, errorThrown) {
              console.error('Error filtering department data:', jqXHR, textStatus, errorThrown);
      },
  });
}

$('#filterlocationsave').click(function() {
  filterLocationData();
});


// Preloader

$(window).on('load', function () {
  if ($('#preloader').length) {
      $('#preloader').delay(1000).fadeOut('slow', function () {
          $(this).remove();
  });
  }
});
