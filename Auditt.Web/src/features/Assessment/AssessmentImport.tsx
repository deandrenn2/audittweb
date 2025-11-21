import { useState } from "react";
import { useAssessments } from "./useAssessment";
import { toast } from "react-toastify";
import { useFileDownload } from "../../shared/components/FilesDowload";

export const AssessmentImport = () => {
    const [file, setFile] = useState<File | null>(null);
    const { importAssessment, queryAssessments, client, selectedDataCut, selectedGuide } = useAssessments();
    const { descargarArchivo } = useFileDownload();

    const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) {
            toast.info("Por favor, selecciona un archivo.");
            return;
        }
        if (file.size > 5 * 1024 * 1024) { // 5 MB
            toast.info("El archivo no puede ser mayor a 5 MB.");
            return;
        }
        if (!file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
            toast.info("El archivo debe ser un archivo de Excel (.xlsx o .xls).");
            return;
        }
        if (!file.type.includes("sheet") && !file.type.includes("excel")) {
            toast.info("El archivo debe ser un archivo de Excel válido.");
            return;
        }
        if (file) {
            setFile(file);
        }
    }

    const handleImport = async () => {
        if (!file) {
            toast.info("Por favor, selecciona un archivo para importar.");
            return;
        }

        if (!client?.id) {
            toast.error("Por favor, selecciona una institución.");
            return;
        }

        if (!selectedDataCut || selectedDataCut === 0) {
            toast.error("Por favor, selecciona un corte de auditoría.");
            return;
        }

        if (!selectedGuide || selectedGuide === 0) {
            toast.error("Por favor, selecciona una guía.");
            return;
        }

        await importAssessment.mutateAsync({
            file,
            institutionId: client.id,
            dataCutId: selectedDataCut,
            guideId: selectedGuide
        });
        queryAssessments.refetch();
        setFile(null);
        // Reset file input
        const fileInput = document.getElementById('assessment-file-input') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const handleDownloadTemplate = async () => {
        if (!client?.id) {
            toast.error("Por favor, selecciona una institución antes de descargar la plantilla.");
            return;
        }

        if (!selectedDataCut || selectedDataCut === 0) {
            toast.error("Por favor, selecciona un corte de auditoría antes de descargar la plantilla.");
            return;
        }

        if (!selectedGuide || selectedGuide === 0) {
            toast.error("Por favor, selecciona una guía antes de descargar la plantilla.");
            return;
        }

        const urlBlob = `/api/assessments/template-import?institutionId=${client.id}&dataCutId=${selectedDataCut}&guideId=${selectedGuide}`;
        await descargarArchivo(urlBlob, "plantilla_importacion_evaluaciones_" + new Date().toISOString().split('T')[0] + ".xlsx");
    }

    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold mb-2">Importar Valoraciones desde Excel</h3>
                <p className="text-gray-600 mb-4">
                    Descarga la plantilla, complétala con los datos de las valoraciones, luego súbela para importar.
                </p>
            </div>

            <div className="flex gap-4 items-center">
                <button
                    type="button"
                    className="bg-green-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-green-700"
                    onClick={handleDownloadTemplate}
                >
                    Descargar Plantilla
                </button>
            </div>

            <div className="border-t pt-4">
                <div className="space-y-4">
                    <input
                        id="assessment-file-input"
                        type="file"
                        accept=".xlsx, .xls"
                        className="mb-4 border-2 bg-gray-100 border-gray-300 rounded p-2 w-full"
                        onChange={handleChangeFile}
                    />
                    <button
                        type="button"
                        className="bg-audittpurple text-white px-4 py-2 rounded cursor-pointer hover:bg-purple-700"
                        onClick={handleImport}
                        disabled={importAssessment.isPending || !file}
                    >
                        {importAssessment.isPending ? 'Importando...' : 'Importar'}
                    </button>
                </div>
            </div>
        </div>
    );
}
