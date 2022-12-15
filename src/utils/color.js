export function colorItem(nico) {
    let color = ''
    if(nico == '1') color='lightblue'
    if(nico == '2') color= 'rgba(0, 255, 0, 0.85)' //green
    if(nico == '3') color='red'
    if(nico == '26') color='grey'
    if(nico == '30') color='rgba(255, 255, 0, 1)'//'yellow'
    if(nico == '31') color='rgba(255, 100, 0, 0.85)' //'orange'
    return color
}
