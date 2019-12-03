var socket = $.WebSocket(options);
$(document).ready(function() {
    
    //loadJIRA('SS-13542');
});
function loadJIRA(id) {
    
    $.ajax({
        url: 'http://jira-web:8080/rest/api/latest/issue/' + id
    })
}
$('#poker-login-form').login({
    overlay: '.poker-overlay',
    userInfoClass: '.poker-userinfo',
    nameClass: '.poker-userinfo-name',
    roleClass: '.poker-userinfo-role',
    loaderBackgroundClass: options.loaderBackgroundClass,
    lsUserKey: options.lsUserKey,
    availableRoles: options.availableRoles,
    roleSettings: {
        developer: {
            hide: ['.scrum-master', '.scrum-product-owner'],
            show: []
        },
        scrumMaster: {
            hide: ['.scrum-developer'],
            show: ['.scrum-master', '.scrum-product-owner']
        },
        productOwner: {
            hide: ['.scrum-developer', '.scrum-master'],
            show: ['.scrum-product-owner']
        },
        spectator: {
            hide: ['.scrum-developer', '.scrum-master', '.scrum-product-owner'],
            show: []
        }
    }
});

$('.poker-logout').logout({
    lsUserKey: options.lsUserKey
});

$('.poker-cards .poker-card').cardselection({
    lsUserKey: options.lsUserKey,
    selectedClass: 'poker-card-selected',
    pokerCardBackClass: '.poker-card-back'
});

$('.poker-chat').chat();

$('.scrum-master').scrumMaster({
    pokerCardsShowButton: '#poker-cards-show-button',
    pokerCardsResetButton: '#poker-cards-reset-button',
    pokerRoomResetButton: '#poker-room-reset',
    showCardsSelectorClass: 'poker-card-display',
    showCardsToggleClass: 'poker-card-display-hidden',
    userstory: '.poker-userstory',
    'i18n': i18n
});

$('.scrum-product-owner').productOwner({
    postUserStoryTextarea: '#poker-userstory-textarea',
    postUserStoryButton: '#poker-userstory-post',
    editUserStoryButton: '#poker-userstory-edit-button',
    userStoryText: '#poker-userstory-text'
});

$('.poker-users-online').userlist({
    availableRoles: options.availableRoles
});

$('.poker-userstory').userstory({
    userstoryText: '#poker-userstory-text',
    editUserStoryButton: '#poker-userstory-edit-button',
});

$('.poker-felt').carddisplay({
    pokerCardsShowButton: '#poker-cards-show-button',
    pokerCardSelectedClass: 'poker-card-selected',
});

$(window).on('load', function() {
    $('.poker-login-user input[type="text"]').focus();
});

var socketOptions = options;
socketOptions.elements = {
    notification: '#poker-notification',
    loaderBackgroundClass: options.loaderBackgroundClass,
};
socket.setOptions(socketOptions);