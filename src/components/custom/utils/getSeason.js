export default function getSeason (d) {
    if(d > 11 && d <= 2 ) return 'winter'
    else if ( d > 2 && d <= 5 ) return 'spring'
    else if ( d > 5 && d <= 8 ) return 'summer'
    else if ( d > 8 && d <= 11 ) return 'autumn'
    else return 'autumn'
}