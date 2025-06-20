import { useMutation, useQuery } from "@tanstack/react-query";
import {
	createFunctionaryServices,
	deleteFunctionaryServices,
	getFunctionary,
	importFunctionaryServices,
	updateFunctionaryServices,
} from "./FunctionaryServices";
import { toast } from "react-toastify";

const KEY = "functionary";
export const useFunctionary = () => {
	const queryFunctionary = useQuery({
		queryKey: [`${KEY}`],
		queryFn: getFunctionary,
	});

	const createFunctionary = useMutation({
		mutationFn: createFunctionaryServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) {
					toast.info(data.message);
				}
				if (data?.error) {
					toast.info(data.error.message);
				}
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryFunctionary.refetch();
				}
			}
		},
	});

	const updateFunctionary = useMutation({
		mutationFn: updateFunctionaryServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) {
					toast.info(data.message);
				}
				if (data?.error) {
					toast.info(data.error.message);
				}
			} else {
				toast.success(data.message);
				queryFunctionary.refetch();
			}
		},
	});

	const deleteFunctionary = useMutation({
		mutationFn: deleteFunctionaryServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) {
					toast.info(data.message);
				}
				if (data?.error) {
					toast.info(data.error.message);
				}
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryFunctionary.refetch();
				}
			}
		},
	});

	const importFunctionary = useMutation({
		mutationFn: importFunctionaryServices,
		onSuccess: (data) => {
			if (!data.isSuccess) {
				if (data?.message) {
					toast.info(data.message);
				}
				if (data?.error) {
					toast.info(data.error.message);
				}
			} else {
				if (data.isSuccess) {
					toast.success(data.message);
					queryFunctionary.refetch();
				}
			}
		},
	});

	return {
		functionarys: queryFunctionary?.data?.data,
		queryFunctionary,
		createFunctionary,
		deleteFunctionary,
		updateFunctionary,
		importFunctionary,
	};
};
