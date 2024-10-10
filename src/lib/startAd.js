let adUnitIdBanner = "ca-app-pub-5911839694379275/9157899592"; // Production
let adUnitIdInterstitial = "ca-app-pub-5911839694379275/9570937608"; // Production
let initialized = false;

export default async function startAd() {
	if (!IS_FREE_VERSION || !admob) return;

	if (!initialized) {
		initialized = true;

		if (BuildInfo.type === "debug") {
			adUnitIdBanner = "ca-app-pub-3940256099942544/6300978111"; // Test
			adUnitIdInterstitial = "ca-app-pub-3940256099942544/5224354917"; // Test
		}
	}

	const consentStatus = await consent.getConsentStatus();
	if (consentStatus === consent.ConsentStatus.Required) {
		await consent.requestInfoUpdate();
	}

	const formStatus = await consent.getFormStatus();
	if (formStatus === consent.FormStatus.Available) {
		const form = await consent.loadForm();
		form.show();
	}

	await admob.start();

	const banner = new admob.BannerAd({
		adUnitId: adUnitIdBanner,
		position: "bottom",
	});

	const interstitial = new admob.InterstitialAd({
		adUnitId: adUnitIdInterstitial,
	});

	interstitial.load();

	interstitial.on("dismiss", () => {
		interstitial.load();
	});
	window.ad = banner;
	window.iad = interstitial;
}
