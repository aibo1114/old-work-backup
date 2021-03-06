m.seatPrice =
    prop:[
        _ep 'title'

        m._select 'color',
            attrs:
                data: [
                    'blue'
                    'purple'
                    'orange'
                    'yellow'
                    'green'
                    'red'
                    'pink'
                    'brown'
                    'black'
                    'lightskyblue'
                ]

        _ep 'price'

        _ep 'num'
    ]

m.show =
    prop:[
        _ep 'title'
        _ep 'subTitle'
        _ep 'pinYin'
        _ep 'row'
        _ep 'content:content' 
        _ep 'geo'

        m._itemTable 'itemTable',
            attrs:
                data: [
                    title: 'Show Time'
                ,
                    title: 'Price'
                ,
                    title: 'Seats'
                ,
                    title: 'Address'
                ,
                    title: 'Getting There'
                ,
                    title: 'Official Website'
                ,
                    title: 'Watch Video'
                ,
                    title: 'Last Updated'
                ]

        m._itemTable 'seatPrice'

        m._itemTable 'theater'

        m._itemTable 'recommend',
            attrs:
                entity: 'recItem'

        m._pic 'slide'
        m._pic 'list'
        m._pic 'seat'
    ]
    filter:
        title: 'text:s:mt'
        
        