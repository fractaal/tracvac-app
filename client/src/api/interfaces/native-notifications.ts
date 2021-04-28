export default interface NativeNotificationService {
  readonly showNotifications: boolean;
  readonly showVaccineNotifications: boolean;
  readonly showLguNotifications: boolean;
  enable(): boolean;
  disable(): boolean;
}
