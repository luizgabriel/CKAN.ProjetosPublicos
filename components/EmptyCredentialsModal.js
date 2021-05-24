import Modal, {ModalBodyIcon} from "./Modal";
import ExclamationIcon from "./ExclamationIcon";
import React from "react";
import {useTranslation} from "next-i18next";

export default function EmptyCredentialsModal() {
	const {t} = useTranslation("common");

	return (
		<Modal>
			<ModalBodyIcon iconColor="red=600" IconComponent={ExclamationIcon}>
				<h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
					{t("unauthorized_modal_title")}
				</h3>
				<div className="mt-2">
					<p className="text-sm text-gray-500">
						{t("unauthorized_modal_description")}
					</p>
				</div>
			</ModalBodyIcon>
		</Modal>
	);
}