// react
import { useNavigate } from 'react-router-dom';

// microsoft
import { loginRequest, protectedResources } from "../authConfig";


const DocumentLoad = ({ error, execute, requestID }) => {
  
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Documenty leca");

        let agr = document.getElementById("agr").files[0];
        let doc = document.getElementById("doc").files[0];

        if (!agr || !doc)
        {
            return;
        }

        // Oba dokumenty zostały wgrane
        let formDataAgr = new FormData();
        formDataAgr.append("file", agr);

        let formDataDoc = new FormData();
        formDataDoc.append("file", agr);

        //console.log("formData = ", formData);

        execute("POST", protectedResources.apiLoanComparer.endpoint + `UploadAgreement/${requestID}`, formDataAgr, 'multipart/form-data')
        .then((result) => {
            console.log(result);
        })
        
        execute("POST", protectedResources.apiLoanComparer.endpoint + `UploadDocument/${requestID}`, formDataDoc, 'multipart/form-data')
        .then((result) => {
            console.log(result);
        })

        navigate("/success");
    }
  
    return (
    <div>
        <div> Jesteś na torze do sukcesu, pozostało tylko wgrać niezbędne dokumenty</div>

        <form onSubmit={handleSubmit}>
            <label htmlFor="agr">Zgoda </label>
            <input type="file" id="agr" name="agreement" />
            <label htmlFor="doc">Dokument </label>
            <input type="file" id="doc" name="document" />

            <button>Submit</button>
        </form>
    </div>
  )
}

export default DocumentLoad