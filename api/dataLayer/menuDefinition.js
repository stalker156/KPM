module.exports.definition = [
    {
        url: '/applications',
        name: 'Заявки',
        roles: null,
        iconClass: "icon home",
        loadFirstChild:true,
        childs:[
            {
                url:'/applications/add',
                name:'Создать завку',
                roles:null
            },
            {
                url:'/applications/accept',
                name:'Принять завку',
                roles:null
            },
            {
                url:'/applications/close',
                name:'Закрыть завку',
                roles:null
            },
        ]
    },
    {
        url: '/cartridges',
        name: 'Картриджи',
        roles: null,
        iconClass: "icon home"
    },
    {
        url: '/devices',
        name: 'Оборудование',
        roles: null,
        iconClass: "icon home"
    },
    {
        url: '/dictionary',
        name: 'Справочники',
        roles: null,
        iconClass: "icon home",
        loadFirstChild:true,
        childs:[
            {
                url:'/dictionary/customer',
                name:'Заказчики',
                roles:null
            },
            {
                url:'/dictionary/cartridgeService',
                name:'Заправка картриджей',
                roles:null
            },
            {
                url:'/dictionary/deviceService',
                name:'Обслуживание оборудования',
                roles:null
            },
            {
                url:'/dictionary/common',
                name:'Общие справочники',
                roles:null,
                loadFirstChild:true,
                childs:[
                    {
                        url:'/dictionary/common/status',
                        name:'Статус',
                        roles:null
                    },
                    {
                        url:'/dictionary/common/color',
                        name:'Цветность',
                        roles:null
                    },
                    {
                        url:'/dictionary/common/printTypes',
                        name:'Тип печати',
                        roles:null
                    },
                    {
                        url:'/dictionary/common/manufacture',
                        name:'Производители',
                        roles:null
                    }
                ]

            },
            {
                url:'/dictionary/utilization',
                name:'Утилизация',
                roles:null
            },
            {
                url:'/dictionary/user',
                name:'Пользователи',
                roles:['fAdmin']
            }
        ]
    },
    // {
    //     url: '/reports',
    //     name: 'Отчеты',
    //     roles: null,
    //     iconClass: "icon home"
    // }
];