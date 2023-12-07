function openVictoryModal() {
    stopTimer();
    const modal = document.getElementById('victoryModal');
    document.getElementById('victoryTime').innerText = seconds;
    modal.style.display = 'block';
}


function closeModal() {
    const modal = document.getElementById('victoryModal');
    modal.style.display = 'none';
}