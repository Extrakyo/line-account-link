var successSnd = '../sounds/popupSuccess.wav';
var warningSnd = '../sounds/popupWarning.wav';
var alertingSnd = '../sounds/popupAlerting.wav';

function fetchEmp(currentPage) {
    $.ajax({
        url: '../php/fetchEmp.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {
            currentPage: currentPage
        },
        beforeSend: function () {
            $('#employeesTable').html('<section class="noData">員工資料獲取中...</section>');
        },
        success: function (data) {
            if (data['status'] == 'success') {
                $('#employeesTable').html(data['empHTML']);
            }
        }
    });
}

function fetchPagination(currentPage) {
    $.ajax({
        url: '../php/fetchPagination.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {
            currentPage: currentPage
        },
        success: function (data) {
            if (data['totalPage'] > 0) {
                var paginationHTML = `<ul>`;
                if (data['currentPage'] > 1) {
                    paginationHTML = `${paginationHTML}<li class="" data-page="${data['currentPage'] - 1}" data-table="" data-type="previous"><i class="fas fa-angle-left fa-fw"></i></li>`;
                } else {
                    paginationHTML = `${paginationHTML}<li class="disabled" data-page="1" data-table="" data-type="previous"><i class="fas fa-angle-left fa-fw"></i></li>`;
                }
                if (data['currentPage'] < 3) {
                    for (var i = 1; i <= data['totalPage']; i++) {
                        if (i == data['currentPage']) {
                            paginationHTML = `${paginationHTML}<li class="active" data-page="${i}" data-table="">${i}</li>`;
                        } else {
                            paginationHTML = `${paginationHTML}<li class="" data-page="${i}" data-table="">${i}</li>`;
                        }
                    }
                } else {
                    for (var i = data['totalPage'] - 1; i <= data['totalPage'] + 1; i++) {
                        if (i == data['currentPage']) {
                            paginationHTML = `${paginationHTML}<li class="active" data-page="${i}" data-table="">${i}</li>`;
                        } else {
                            paginationHTML = `${paginationHTML}<li class="" data-page="${i}" data-table="">${i}</li>`;
                        }
                    }
                }
                if (data['totalPage'] == data['currentPage']) {
                    paginationHTML = `${paginationHTML}<li class="disabled" data-page="${data['currentPage']}" data-table="" data-type="next"><i class="fas fa-angle-right fa-fw"></i></li>`;
                } else {
                    paginationHTML = `${paginationHTML}<li class="" data-page="${data['currentPage'] + 1}" data-table="" data-type="next"><i class="fas fa-angle-right fa-fw"></i></li>`;
                }
                paginationHTML = `${paginationHTML}<div class="select"><select name="pageNum" id="pageNum" data-table="">`;
                for (var j = 1; j <= data['totalPage']; j++) {
                    if (j == data['currentPage']) {
                        paginationHTML = `${paginationHTML}<option value="${j}" selected>${j}</option>`;
                    } else {
                        paginationHTML = `${paginationHTML}<option value="${j}">${j}</option>`;
                    }
                }
                paginationHTML = `${paginationHTML}</select></div>`;
                paginationHTML = `${paginationHTML}</ul>`;
                $('.pagination').html(paginationHTML);
            } else {
                $('.pagination').html('');
            }
            // <ul>
            //         <li class="disabled" data-page="1" data-table=""><i class="fas fa-angle-left fa-fw"></i></li>
            //         <li class="active" data-page="1" data-table="">1</li>
            //         <li class="" data-page="2" data-table="">2</li>
            //         <li class="" data-page="3" data-table="">3</li>
            //         <li class="" data-page="4" data-table=""><i class="fas fa-angle-right fa-fw"></i></li>
            //     </ul>
            //     <div class="select">
            //         <select name="pageNum" id="pageNum" data-table="">
            //             <option value="1">1</option>
            //         </select>
            //     </div>
        }
    });
}

fetchEmp(1);
fetchPagination(1);

$(document).on('click', '.pagination ul li[data-page]:not([data-type="previous"], [data-type="next"])', function () {
    var empSearch = $('#empSearch').val();
    if (empSearch == '') {
        fetchEmp($(this).data('page'));
    } else {
        searchEmp($(this).data('page'), empSearch);
    }
    // fetchEmp($(this).data('page'));
    $('.pagination ul li[data-page]').removeClass('active');
    $(this).addClass('active');
    if (empSearch == '') {
        fetchPagination($(this).data('page'));
    } else {
        paginationSearch($(this).data('page'), empSearch);
    }
    // fetchPagination($(this).data('page'));
});

$(document).on('click', '.pagination ul li[data-page][data-type="previous"]', function () {
    var empSearch = $('#empSearch').val();
    if (empSearch == '') {
        fetchEmp($(this).data('page'));
    } else {
        searchEmp($(this).data('page'), empSearch);
    }
    // fetchEmp($(this).data('page'));
    var page = $(this).data('page');
    $(`.pagination ul li[data-type="next"]`).attr('data-page', page + 1);
    $('.pagination ul li[data-page]:not([data-type="previous"], [data-type="next"]').removeClass('active');
    $(`.pagination ul li[data-page="${page}"]:not([data-type="previous"]`).addClass('active');
    if (empSearch == '') {
        fetchPagination($(this).data('page'));
    } else {
        paginationSearch($(this).data('page'), empSearch);
    }
    // fetchPagination($(this).data('page'));
});

$(document).on('click', '.pagination ul li[data-page][data-type="next"]', function () {
    var empSearch = $('#empSearch').val();
    if (empSearch == '') {
        fetchEmp($(this).data('page'));
    } else {
        searchEmp($(this).data('page'), empSearch);
    }
    // fetchEmp($(this).data('page'));
    var page = $(this).data('page');
    $(`.pagination ul li[data-type="previous"]`).attr('data-page', page - 1);
    $('.pagination ul li[data-page]:not([data-type="previous"], [data-type="next"]').removeClass('active');
    $(`.pagination ul li[data-page="${page}"]:not([data-type="next"]`).addClass('active');
    if (empSearch == '') {
        fetchPagination($(this).data('page'));
    } else {
        paginationSearch($(this).data('page'), empSearch);
    }
    // fetchPagination($(this).data('page'));
});

$(document).on('change', '.pagination .select #pageNum', function () {
    var empSearch = $('#empSearch').val();
    if (empSearch == '') {
        fetchEmp($(this).val());
    } else {
        searchEmp($(this).val(), empSearch);
    }
    if (empSearch == '') {
        fetchPagination($(this).val());
    } else {
        paginationSearch($(this).val(), empSearch);
    }
    // fetchEmp($(this).val());
    // fetchPagination($(this).val());
});

$('#deleteAllEmployeesBtn').on('click', function () {
    $('.modals').addClass('show');
    $('.modals #deleteAllEmployees').addClass('show');
});

$('#deleteSelectedEmployeesBtn').on('click', function () {
    $('.modals').addClass('show');
    $('.modals #deleteSelectedEmployees').addClass('show');
});

$('#deleteAllEmployees .functions button[data-type="submit"]').on('click', function () {
    deleteAllEmp();
    // $('.modals').removeClass('show');
    // $('.modals #deleteAllEmployees').removeClass('show');
    $('#deleteAllEmployees').addClass('fadeOut');
    setTimeout(function () {
        $('#deleteAllEmployees').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

$('#deleteAllEmployees .functions button[data-type="cancel"]').on('click', function () {
    $('.modals').removeClass('show');
    $('.modals #deleteAllEmployees').removeClass('show');
});

$('#deleteAllEmployees .topbar .closeBtn').on('click', function () {
    // $('.modals').removeClass('show');
    // $('.modals #deleteAllEmployees').removeClass('show');
    $('#deleteSelectedEmployees').addClass('fadeOut');
    setTimeout(function () {
        $('#deleteSelectedEmployees').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

$('#deleteSelectedEmployees .functions button[data-type="submit"]').on('click', function () {
    // $('.modals').removeClass('show');
    // $('.modals #deleteSelectedEmployees').removeClass('show');
    $('#deleteSelectedEmployees').addClass('fadeOut');
    setTimeout(function () {
        $('#deleteSelectedEmployees').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
    deleteEmps();
});

$('#deleteSelectedEmployees .functions button[data-type="cancel"]').on('click', function () {
    // $('.modals').removeClass('show');
    // $('.modals #deleteSelectedEmployees').removeClass('show');
    $('#deleteSelectedEmployees').addClass('fadeOut');
    setTimeout(function () {
        $('#deleteSelectedEmployees').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

$('#deleteSelectedEmployees .topbar .closeBtn').on('click', function () {
    $('.modals').removeClass('show');
    $('.modals #deleteSelectedEmployees').removeClass('show');
});

$(document).on('click', '#selectEmployees0', function (e) {
    var selectEmployees = document.getElementsByName('selectEmployees[]');
    if (e.target.checked == true) {
        for (var checkbox of selectEmployees) {
            if (checkbox.disabled == false) {
                checkbox.checked = true;
            }
        }
    } else {
        for (var checkbox of selectEmployees) {
            checkbox.checked = false;
        }
    }
});

function fetchThisEmp(employeeId) {
    var inputs = ['avatar', 'empLname', 'empFname', 'empEmail', 'empMobile', 'empGender', 'empUsrn', 'employeeId', 'jobTitle', 'authLevel', 'empNote'];
    var inputsData = ['avatar', 'editEmpLname', 'editEmpFname', 'editEmpEmail', 'editEmpMobile', 'editEmpGender', 'editEmpUsrn', 'editEmployeeId', 'editJobTitle', 'editAuthLevel', 'editEmpNote'];
    $.ajax({
        url: '../php/fetchThisEmp.php',
        type: 'POST',
        dataType: 'json',
        data: {
            employeeId: employeeId
        },
        success: function (data) {
            if (data['status'] == 'success') {
                inputs.forEach(function (element, index) {
                    if (element == 'avatar') {
                        $('#editEmp .avatarContainer .avatar img').attr('src', `../images/avatar/${data[element]}`);
                    } else if ((element == 'empGender') || (element == 'empGender')) {
                        $(`#editEmp input[name="${inputsData[index]}"][value="${data[element]}"]`).prop('checked', true);
                    } else if (element == 'jobTitle') {
                        // $(`#editEmp select[name="${inputsData[index]}"]`).val(`${data[element]}`);
                        $(`#editEmp select[name="${inputsData[index]}"] option[value="${data[element]}"]`).prop('selected', true);
                    } else {
                        $(`#editEmp [name="${inputsData[index]}"]`).val(`${data[element]}`);
                    }
                });
                $('.drawer').addClass('show');
            } else {
                createWarningPopup(data['status'], warningSnd);
            }
        }
    });
}

function updateThisEmp(empData) {
    var currentPage = $('.pagination ul li.active').data('page');
    console.log(currentPage);
    console.log(empData);
}

function deleteThisEmp(employeeId) {
    $.ajax({
        url: '../php/deleteThisEmp.php',
        type: 'POST',
        dataType: 'text',
        data: {
            employeeId: employeeId
        },
        success: function (data) {
            if (data == 'success') {
                fetchEmp(1);
                fetchPagination(1);
                createSuccessPopup('已成功刪除此員工！', successSnd);
                $('.drawer').removeClass('show');
            } else {
                createWarningPopup(data, warningSnd);
            }
        }
    });
}

function deleteEmps() {
    var employeesTableForm = document.getElementById('employeesTable');
    var employeesTableData = new FormData(employeesTableForm);
    employeesTableData.delete('selectEmps');
    $.ajax({
        url: '../php/deleteEmps.php',
        type: 'POST',
        dataType: 'json',
        processData: false,
        contentType: false,
        data: employeesTableData,
        beforeSend: function () {
            createAlertingPopup('正在刪除所選員工，請稍後...', alertingSnd);
        },
        success: function (data) {
            if (data['status'] == 'success') {
                fetchEmp(1);
                fetchPagination(1);
                createSuccessPopup(`已成功刪除 ${data['amount']} 所選員工！`, successSnd);
            } else {
                console.log(data);
                createWarningPopup(data, warningSnd);
            }
        }
    });
}

function deleteAllEmp() {
    $.ajax({
        url: '../php/deleteAllEmp.php',
        type: 'POST',
        dataType: 'text',
        success: function (data) {
            if (data == 'success') {
                fetchEmp(1);
                fetchPagination(1);
                createSuccessPopup('已成功刪除此員工！', successSnd);
            } else {
                createWarningPopup(data, warningSnd);
            }
        }
    });
}

$(document).on('click', 'button[data-type="drawer"]', function () {
    fetchThisEmp($(this).data('emp'));
});

$('#editEmp').on('submit', function (e) {
    e.preventDefault();
    updateThisEmp($('#editEmp').serialize());
});

$('button[data-type="deleteEmp"]').on('click', function (e) {
    e.preventDefault();
    deleteThisEmp($(this).data('emp'));
});

$('#editEmp .drawerFunc button[data-type="cancel"]').on('click', function (e) {
    e.preventDefault();
    $('.drawer').removeClass('show');
});

$('.drawer header .btn').on('click', function () {
    $('.drawer').removeClass('show');
});

$('#addEmployeesBtn').on('click', function () {
    $('.modals').addClass('show');
    $('#addEmployees').addClass('show');
    $('#addEmployees input')[0].focus();
});

$('#addEmployees').on('submit', function (e) {
    e.preventDefault();
    var inputs = ['empLname', 'empFname', 'empEmail', 'empMobile', 'empGender', 'empUsrn', 'employeeId', 'jobTitle', 'authLevel'];
    $.ajax({
        url: '../php/addEmp.php',
        type: 'POST',
        dataType: 'json',
        data: $('#addEmployees').serialize(),
        beforeSend: function () {
            createAlertingPopup('員工正在建檔中，請稍後...', alertingSnd);
            $('#addEmployees .functions button.primary').attr('disabled', true);
        },
        success: function (data) {
            $('#addEmployees .functions button.primary').attr('disabled', false);
            if (data['status'] == 'success') {
                // $('.modals').removeClass('show');
                // $('.modals #addEmployees').removeClass('show');
                $('#addEmployees').addClass('fadeOut');
                setTimeout(function () {
                    $('#addEmployees').removeClass('fadeOut').removeClass('show');
                    $('.modals').removeClass('show');
                }, 200);
                $('#addEmployees')[0].reset();
                $('#addEmployees input').removeClass('error');
                $('#addEmployees label').removeClass('error');
                $('#addEmployees select').removeClass('error');
                createSuccessPopup('員工建檔成功！', successSnd);
            } else {
                inputs.forEach(function (element, index) {
                    if (element == 'empGender') {
                        if (data[element] != 'valid') {
                            $(`[name="${element}"]`).parent().find('label').addClass('error');
                            createWarningPopup(data[element], warningSnd);
                        } else {
                            $(`[name="${element}"]`).parent().find('label').removeClass('error');
                        }
                    } else {
                        if (data[element] != 'valid') {
                            $(`[name="${element}"]`).addClass('error');
                            createWarningPopup(data[element], warningSnd);
                        } else {
                            $(`[name="${element}"]`).removeClass('error');
                        }
                    }
                });
            }
            fetchEmp()
        }
    });
});

$('#addEmployees .functions button[data-type="cancel"]').on('click', function () {
    $('#addEmployees').addClass('fadeOut');
    setTimeout(function () {
        $('#addEmployees').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
    $('#addEmployees')[0].reset();
    $('#addEmployees input').removeClass('error');
    $('#addEmployees label').removeClass('error');
    $('#addEmployees select').removeClass('error');
});

$('#addEmployees .topbar .closeBtn').on('click', function () {
    $('#addEmployees').addClass('fadeOut');
    setTimeout(function () {
        $('#addEmployees').removeClass('fadeOut').removeClass('show');
        $('.modals').removeClass('show');
    }, 200);
});

$('#resetPwd').on('click', function (e) {
    e.preventDefault();
    $('#editEmpPwd').val('Foodler2022//');
});

function searchEmp(currentPage, empSearch) {
    $.ajax({
        url: '../php/searchEmp.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {
            currentPage: currentPage,
            empSearch: empSearch
        },
        beforeSend: function () {
            $('#employeesTable').html('<section class="noData">員工資料獲取中...</section>');
        },
        success: function (data) {
            if (data['status'] == 'success') {
                $('#employeesTable').html(data['empHTML']);
            }
        }
    });
}

function paginationSearch(currentPage, empSearch) {
    $.ajax({
        url: '../php/paginationSearch.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {
            currentPage: currentPage,
            empSearch: empSearch
        },
        success: function (data) {
            if (data['totalPage'] > 0) {
                var paginationHTML = `<ul>`;
                if (data['currentPage'] > 1) {
                    paginationHTML = `${paginationHTML}<li class="" data-page="${data['currentPage'] - 1}" data-table="" data-type="previous"><i class="fas fa-angle-left fa-fw"></i></li>`;
                } else {
                    paginationHTML = `${paginationHTML}<li class="disabled" data-page="1" data-table="" data-type="previous"><i class="fas fa-angle-left fa-fw"></i></li>`;
                }
                if (data['currentPage'] < 3) {
                    for (var i = 1; i <= data['totalPage']; i++) {
                        if (i == data['currentPage']) {
                            paginationHTML = `${paginationHTML}<li class="active" data-page="${i}" data-table="">${i}</li>`;
                        } else {
                            paginationHTML = `${paginationHTML}<li class="" data-page="${i}" data-table="">${i}</li>`;
                        }
                    }
                } else {
                    for (var i = data['totalPage'] - 1; i <= data['totalPage'] + 1; i++) {
                        if (i == data['currentPage']) {
                            paginationHTML = `${paginationHTML}<li class="active" data-page="${i}" data-table="">${i}</li>`;
                        } else {
                            paginationHTML = `${paginationHTML}<li class="" data-page="${i}" data-table="">${i}</li>`;
                        }
                    }
                }
                if (data['totalPage'] == data['currentPage']) {
                    paginationHTML = `${paginationHTML}<li class="disabled" data-page="${data['currentPage']}" data-table="" data-type="next"><i class="fas fa-angle-right fa-fw"></i></li>`;
                } else {
                    paginationHTML = `${paginationHTML}<li class="" data-page="${data['currentPage'] + 1}" data-table="" data-type="next"><i class="fas fa-angle-right fa-fw"></i></li>`;
                }
                paginationHTML = `${paginationHTML}<div class="select"><select name="pageNum" id="pageNum" data-table="">`;
                for (var j = 1; j <= data['totalPage']; j++) {
                    if (j == data['currentPage']) {
                        paginationHTML = `${paginationHTML}<option value="${j}" selected>${j}</option>`;
                    } else {
                        paginationHTML = `${paginationHTML}<option value="${j}">${j}</option>`;
                    }
                }
                paginationHTML = `${paginationHTML}</select></div>`;
                paginationHTML = `${paginationHTML}</ul>`;
                $('.pagination').html(paginationHTML);
            } else {
                $('.pagination').html('');
            }
        }
    });
}

var debounceTimerId;

function searchEmpDebounce(empSearch) {
    clearTimeout(debounceTimerId);
    debounceTimerId = setTimeout(function () {
        searchEmp(1, empSearch);
        paginationSearch(1, empSearch);
    }, 1000);
}

$('#empSearch').on('keyup', function () {
    var empSearch = $(this).val();
    if (empSearch != '') {
        searchEmpDebounce(empSearch);
    } else {
        fetchEmp(1);
        fetchPagination(1);
    }
});