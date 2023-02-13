//   chuyển đổi văn bản thành ADN và ngược lại 

// Gửi tin nhắn tới ADN:
// Hàm convertTextToADN lấy một chuỗi văn bản làm đầu vào.
// Đầu tiên, nó chuyển đổi văn bản thành biểu diễn nhị phân, tức là, một chuỗi các số 0 và 1.
// Biểu diễn nhị phân sau đó được chuyển đổi thành một hệ gồm 4 chữ số, trong đó mỗi chữ số có thể là một trong 0, 1, 2 hoặc 3.
// Cuối cùng, biểu diễn 4 chữ số được chuyển đổi thành ADN, trong đó 0 trở thành A, 1 trở thành T, 2 trở thành G và 3 trở thành C.
// Chuỗi ADN cuối cùng được trả về làm đầu ra.
// ADN thành văn bản:
// Hàm convertADNtoText lấy chuỗi ADN làm đầu vào.
// Đầu tiên, nó chuyển đổi ADN thành một hệ thống gồm 4 chữ số, trong đó mỗi chữ số có thể là một trong số 0, 1, 2 hoặc 3.
// Biểu diễn 4 chữ số sau đó được chuyển đổi thành biểu diễn nhị phân, tức là, một chuỗi các số 0 và 1.
// Cuối cùng, biểu diễn nhị phân được chuyển đổi thành văn bản bằng cách sử dụng mã ký tự của mỗi chuỗi nhị phân.
// Chuỗi văn bản cuối cùng được trả về dưới dạng đầu ra.
// Ngoài ra, mã sử dụng các biến OUTPUT1, OUTPUT2, OUTPUT3 và OUTPUT4 để hiển thị kết quả của từng bước trong tài liệu HTML, nhưng sẽ rõ ràng hơn nếu bạn cũng đăng mã HTML có liên quan cho việc này.
const OUTPUT1 = document.getElementById("OUTPUT1");
const OUTPUT2 = document.getElementById("OUTPUT2");
const OUTPUT3 = document.getElementById("OUTPUT3");
const OUTPUT4 = document.getElementById("OUTPUT4");

// ! Hàm coppy nội dung output
function CopyOutput() {
 alert(  OUTPUT4.innerText);
}

function CoppyInput(id) {
    const sequence = document.getElementById(`seq${id}`).innerText;
    PLAYER_INPUT.value = sequence;
}
function remove_the_last_space(space) {
    // bỏ space cuối cùng 
    return space.replace(/\s+$/, '');
}
function convertTextToADN(text) {
    OUTPUT1.textContent=("Văn bản: " + `${text}`);
 
    // Bước 1: Chuyển đổi văn bản thành (0,1)
    let binary = "";
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        let _binary = charCode.toString(2);
        // Thêm 0 để đảm bảo có 8 bit
        _binary = _binary.padStart(8, "0");
        binary += _binary + " ";
    }
    binary = remove_the_last_space(binary);
    OUTPUT2.textContent=("Nhị phân: " + `${binary}`);



    // Hệ thống số cơ số 4, còn được gọi là quater-nybble hoặc nibble
    // Bước 2: Chuyển đổi (0,1) thành (0,1,2,3)
    let base4 = '';
    Loop = binary.split(" ");
    Loop.forEach(element => {
        for (let i = 0; i < element.length; i += 2) {
            let twoBits = element.substr(i, 2);
            switch (twoBits) {
                case '00':
                    base4 = base4 + "0";
                    break;
                case '01':
                    base4 = base4 + "1";
                    break;
                case '10':
                    base4 = base4 + "2";
                    break;
                case '11':
                    base4 = base4 + "3";
                    break;
            }
        }
        base4 = base4 + " ";
    });
    base4 = remove_the_last_space(base4);
    OUTPUT3.textContent=("4 phân: " + `${base4}`);



    // Bước 3: Chuyển đổi (0,1,2,3) thành ADN 
    ADN = base4.replace(/([0-3])/g, (match) => {
        switch (match) {
            case "0":
                return "A";
            case "1":
                return "T";
            case "2":
                return "G";
            case "3":
                return "C";
        }
    });
    OUTPUT4.textContent=("ADN: " + `${ADN}`);
    return ADN;
}
function convertADNtoText(ADN) {
    console.log("ADN: " + `${ADN}`);



    // Bước 1: Chuyển đổi ADN thành (0,1,2,3)
    let base4 = ADN.replace(/([A-Z])/g, (match) => {
        switch (match) {
            case "A":
                return "0";
            case "T":
                return "1";
            case "G":
                return "2";
            case "C":
                return "3";
        }
    });

    console.log("4 phân: " + `${base4}`);


    // Bước 2: Chuyển đổi 4 bit (0,1,2,3) thành (0,1) 
    let binary = '';
    Loop = base4.split(" ");
    Loop.forEach(element => {
        for (let i = 0; i < element.length; i += 1) {
            let oneBit = element.substr(i, 1);
            switch (oneBit) {
                case '0':
                    binary = binary + "00";
                    break;
                case '1':
                    binary = binary + "01";
                    break;
                case '2':
                    binary = binary + "10";
                    break;
                case '3':
                    binary = binary + "11";
                    break;
            }
        }
        binary = binary + " ";
    });
    binary = remove_the_last_space(binary);
    console.log("Nhị phân: " + `${binary}`);



    // Bước 3: Chuyển đổi (0,1) thành văn bản 
    let text = "";
    Loop = binary.split(" ");
    Loop.forEach(element => {
        Loop = String.fromCharCode(parseInt(element, 2));
        text += (Loop);
    });
    console.log("Văn bản: " + `${text}`);
    return text;
}

// ! hàm Main xử lí của chương trình
function Main() {
    try {
        // * lấy input 
        var GiaTriInput = document.getElementById("INPUT").value;
        var ChucNang = document.querySelector('input[name="CHUC_NANG"]:checked').value;

        // * Tùy theo lựa chọn của người dùng mà dùng 1 trong 2 hàm
        // * hàm có chức năng chuyển văn bản thành ADN
        // * hàm có chức năng chuyển ADN thành văn bản
        if (ChucNang == "CHUYEN_ADN_THANH_VAN_BAN") {
            // document.getElementById("OUTPUT").innerHTML = ChuyenADNThanhVanBan(GiaTriInput);
            convertADNtoText(GiaTriInput);    
            return;
        }
        
        if (ChucNang == "CHUYEN_VAN_BAN_THANH_ADN") {
// document.getElementById("OUTPUT").innerHTML = ChuyenVanBanThanhADN(GiaTriInput);
            convertTextToADN(GiaTriInput); 
            return;
        }
    } catch (error) {
        
        document.getElementById("OUTPUT1").innerHTML = error.message;
    }
} 
// cơ số 4
// cơ số 2 