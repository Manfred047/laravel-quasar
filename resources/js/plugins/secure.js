if (self === top) {
    let antiClickjack = document.getElementById('antiClickjack');
    antiClickjack.parentNode.removeChild(antiClickjack);
} else {
    top.location = self.location;
}