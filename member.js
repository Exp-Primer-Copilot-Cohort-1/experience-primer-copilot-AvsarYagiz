function skillsMember() {
  var member = document.getElementById("member");
  var memberSkills = document.getElementById("memberSkills");
  var memberSkillsButton = document.getElementById("memberSkillsButton");
  if (memberSkills.style.display === "none") {
    memberSkills.style.display = "block";
    memberSkillsButton.innerHTML = "Hide Skills";
    member.style.height = "auto";
  } else {
    memberSkills.style.display = "none";
    memberSkillsButton.innerHTML = "Show Skills";
    member.style.height = "auto";
  }
}