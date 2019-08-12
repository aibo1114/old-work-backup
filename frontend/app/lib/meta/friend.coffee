$.extend meta,
    friend:
        msg:
            type: 'textarea'
            cols: -1
            attr:
                rows: 3

        status:
            type: 'radio'
            name: 'Agree Follow'
            attrs:
                data: [
                    label: 'Agree Be Followed'
                    val: 1
                    selected: true
                ,
                    label: 'Agree to Add Friend'
                    val: 2
                ,
                    label: 'Denied Request'
                    val: -1
                ]