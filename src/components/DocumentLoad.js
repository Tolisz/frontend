// microsoft
import { loginRequest, protectedResources } from "../authConfig";


const DocumentLoad = ({ error, execute, requestID }) => {
  
    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Documenty leca");

        let agr = document.getElementById("agr").files[0];
        //console.log("agr = ", agr);

        let doc = document.getElementById("doc").files[0];
        //console.log(doc);

        if (!agr || !doc)
        {
            return;
        }

        // Oba dokumenty zostały wgrane
        
        let formDataAgr = new FormData();
        formDataAgr.append("file", agr);

        //console.log("formData = ", formData);

        if (agr)
        {
            console.log("Jestem i próbuje wysłać");
            execute("POST", protectedResources.apiLoanComparer.endpoint + `UploadAgreement/${requestID}`, formDataAgr, 'multipart/form-data')
            .then((result) => {
                console.log(result);
            })
        }
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