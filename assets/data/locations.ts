const districts = [
     {
          district: "Gasabo",
          sectors: [ "Bumbogo", "Gatsata", "Jali", "Gikomero", "Gisozi", "Jabana", "Kinyinya", "Ndera", "Nduba", "Rusororo", "Rutunga", "Kacyiru", "Kimihurura", "Kimironko", "Remera" ]
     },
     {
          district: "Kicukiro",
          sectors: [ "Gahanga", "Gatenga", "Gikondo", "Kagarama", "Kanombe", "Kicukiro", "Kigarama", "Masaka", "Niboye", "Nyarugunga" ]
     },
     {
          district: "Nyarugenge",
          sectors: [ "Gitega", "Kanyinya", "Kigali", "Kimisagara", "Mageragere", "Muhima", "Nyakabanda", "Nyamirambo", "Rwezamenyo", "Nyarugenge" ]
     },
     {
          district: "Bugesera",
          sectors: [ "Gashora", "Juru", "Kamabuye", "Ntarama", "Mbyo", "Mayange", "Musenyi", "Mwogo", "Ngeruka", "Nyamata", "Nyarugenge", "Rilima", "Ruhuha", "Rweru", "Shyara" ]
     },
     {
          district: "Gatsibo",
          sectors: [ "Gasange", "Gatsibo", "Gitoki", "Kabarore", "Kageyo", "Kiramuruzi", "Kiziguro", "Muhura", "Murambi", "Ngarama", "Nyagihanga", "Remera", "Rugarama", "Rwimbogo"]
     },
     {
          district: "Kayonza",
          sectors: [ "Gahini", "Kabare", "Kabarondo", "Mukarange", "Murama", "Murundi", "Mwiri", "Ndego", "Nyamirama", "Rukara", "Ruramira", "Rwinkwavu"]
     },
     {
          district: "Kirehe",
          sectors: [ "Gahara", "Gatore", "Kigina", "Kirehe", "Mahama", "Mpaanga", "Musaza", "Mushikiri", "Naasho", "Nyamugari", "Nyarubuye", "Kigarama" ]
     },
     {
          district: "Ngoma",
          sectors: [ "Gashanda", "Jarama", "Karembo", "Kazo", "Kibungo", "Mugesera", "Murama", "Mutenderi", "Remera", "Rukira", "Rukumberi", "Rurenge", "Sake", "Zaza" ]
     }, {
          district: "Nyagatare",
          sectors: [ "Gatunda", "Kiyombe", "Karama", "Karangazi", "Katabagemu", "Matimba", "Mimuli", "Mukama", "Musheli", "Nyagatare", "Rukomo", "Rwempasha", "Rwimiyaga", "Tabagwe" ]
     },
     {
          district: "Rwamagana",
          sectors: [ "Fumbwe", "Gahengeri", "Gishari", "Karenge", "Kigabiro", "Muhazi", "Munyaga", "Munyiginya", "Musha", "Muyumbu", "Mwulire", "Nyakariro", "Nzige", "Rubona" ]
     },
     {
          district: "Burera",
          sectors: [ "Bungwe", "Butaro", "Cyanika", "Cyeru", "Gahunga", "Gatebe", "Gitovu", "Kagogo", "Kinoni", "Kinyababa", "Kivuye", "Nemba", "Rugarama", "Rugendabari", "Ruhunde", "Rusarabuge", "Rwerere" ]
     },
     {
          district: "Gakenke",
          sectors: ["Busengo", "Coko", "Cyabingo", "Gakenke", "Gashenyi", "Mugunga", "Janja", "Kamubuga", "Karambo", "Kivuruga", "Mataba", "Minazi", "Muhondo", "Muyongwe", "Muzo", "Nemba", "Ruli", "Rusasa", "Rushashi" ]
     },
     {
          district: "Gicumbi",
          sectors: ["Bukure", "Bwisige", "Byumba", "Cyumba", "Giti", "Kaniga", "Manyagiro", "Miyove", "Kageyo", "Mukarange", "Muko", "Mutete", "Nyamiyaga", "Nyankenke", "Rubaya", "Rukomo", "Rushaki", "Rutare", "Ruvune", "Rwamiko", "Shangasha" ]
     },
     {
          district: "Musanze",
          sectors: ["Busogo", "Cyuve", "Gacaca", "Gashaki", "Gataraga", "Kimonyi", "Kinigi", "Muhoza", "Muko", "Musanze", "Nkotsi", "Nyange", "Remera", "Rwaza", "Shingiro" ]
     },
     { 
          district: "Rulindo",
          sectors: [ "Base", "Burega", "Bushoki", "Buyoga", "Cyinzuzi", "Cyungo", "Kinihira", "Kisaro", "Masoro", "Mbogo", "Murambi", "Ngoma", "Ntarabana", "Rukozo", "Rusiga", "Shyorongi", "Tumba" ]
     }, 
     {
          district: "Gisagara",
          sectors: ["Gikonko", "Gishubi", "Kansi", "Kibilizi", "Kigembe", "Mamba", "Muganza", "Mugombwa", "Mukindo", "Musha", "Ndora", "Nyanza", "Save" ]
     },
     {
          district: "Huye",
          sectors: ["Gishamvu", "Karama", "Kigoma", "Kinazi", "Maraba", "Mbazi", "Mukura", "Ngoma", "Ruhashya", "Rusatira", "Rwaniro", "Simbi", "Tumba", "Huye" ]
     },
     {
          district: "Kamonyi",
          sectors: ["Gacurabwenge", "Karama", "Kayenzi", "Kayumbu", "Mugina", "Musambira", "Ngamba", "Nyamiyaga", "Nyarubaka", "Rugalika", "Rukoma", "Runda" ]
     },
     {
          district: "Muhanga",
          sectors: ["Cyeza", "Kabacuzi", "Kibangu", "Kiyumba", "Muhanga", "Mushishiro", "Nyabinoni", "Nyamabuye", "Nyarusange", "Rongi", "Rugendabari", "Shyogwe" ]
     },
     {
          district: "Nyamagabe",
          sectors: ["Buruhukiro", "Cyanika", "Gatare", "Kaduha", "Kamegeli", "Kibirizi", "Kibumbwe", "Kitabi", "Mbazi", "Mugano", "Musange", "Musebeya", "Mushubi", "Nkomane", "Gasaka", "Tare", "Uwinkingi" ]
     },
     {
          district: "Nyanza",
          sectors: ["Busasamana", "Busoro", "Cyabakamyi", "Kibirizi", "Kigoma", "Mukingo", "Rwabicuma", "Muyira", "Ntyazo", "Nyagisozi" ]
     },
     {
          district: "Nyaruguru",
          sectors: ["Cyahinda", "Busanze", "kibeho", "Mata", "Munini", "Kivu", "Ngera", "Ngoma", "Nyabimata", "Nyagisozi", "Ruheru", "Muganza", "Ruramba", "Rusenge" ]
     },
     {
          district: "Ruhango",
          sectors: ["Bweramana", "Byimana", "Kabagari", "Kinazi", "Kinihira", "Mbuye", "Mwendo", "Ntongwe", "Ruhango"]
     },
     {
          district: "Karongi",
          sectors: ["Bwishyura", "Gashari", "Gishyita", "Rubengera", "Gitesi", "Mutuntu", "Murundi", "Murambi", "Mubuga", "Rugabano", "Ruganda", "Rwankuba", "Twumba"]
     },
     {
          district: "Ngororero",
          sectors: ["Bwira", "Gatumba", "Hindiro", "Kabaya", "Kageyo", "Kavumu", "Matyazo", "Muhanda", "Muhororo", "Ndaro", "Ngororero", "Nyange", "Sovu" ]
     },
     {
          district: "Nyabihu",
          sectors: ["Bigogwe", "Jenda", "Jomba", "Kabatwa", "Karago", "Kintobo", "Mukamira", "Muringa", "Rambura", "Rugera", "Rurembo", "Shyira"]
     },
     {
          district: "Nyamasheke",
          sectors: ["Bushekeri", "Bushenge", "Cyato", "Gihombo", "Kagano", "Kanjongo", "Karambi", "Karengera", "Kirimbi", "Macuba", "Mahembe", "Nyabitekeri", "Rangiro", "Ruharambuga", "Shangi"]
     },
     {
          district: "Rubavu",
          sectors: ["Bugeshi", "Busasamana", "Cyanzarwe", "Gisenyi", "Kanama", "Kanzenze", "Mudende", "Nyakiliba", "Nyamyumba", "Nyundo", "Rubavu", "Rugerero"]
     },
     {
          district: "Rusizi",
          sectors: ["Bugarama", "Butare", "Bweyeye", "Gikundamvura", "Gashonga", "Giheke", "Gihundwe", "Gitambi", "Kamembe", "Muganza", "Mururu", "Nkanka", "Nkombo", "Nkungu", "Nyakabuye", "Nyakarenzo", "Nzahaha", "Rwimbogo"]
     },
     {
          district: "Rutsiro",
          sectors: ["Boneza", "Gihango", "Kigeyo", "Kivumu", "Manihira", "Mukura", "Murunda", "Musasa", "Mushonyi", "Mushubati", "Nyabirasi", "Ruhango", "Rusebeya"]
     }
]

export default districts