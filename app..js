document.getElementById("search button").addEventListener("click", async () => {
    const response = await fetch("superheroes.php");

    const text = await response.text();

    alert(text);
});
